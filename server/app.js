const express = require('express');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const xss = require('xss-clean');

const ErrorHandler = require('./utils/errorHandler');
const globalErrorHandler = require('./controllers/errorController');
const agentRoute = require('./routes/agentRoute');
const reviewRoute = require('./routes/reviewRoute');
require('./models/index');

const app = express();

const port = process.env.PORT || 3001;

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { version } = require('../package.json');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Take-home',
			version,
			description: 'Take-home',
		},
		servers: [
			{
				url: `http://localhost:${port}`,
			},
		],
	},
	apis: ['server/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(helmet());
app.use(cors('*'));
app.use(express.json());
app.use(xss());

app.use('/agents', agentRoute);
app.use('/agents', reviewRoute);

app.all('*', (req, res, next) => {
	next(
		new ErrorHandler(`Can't find this ${req.originalUrl} on this server`, 400)
	);
});
app.use(globalErrorHandler);

module.exports = app;
