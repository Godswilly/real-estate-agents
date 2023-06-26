const http = require('http');
require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 3001;

const server = http.createServer(app);

process.on('uncaughtException', (err) => {
	console.log(err.name, err.message);
	process.exit(1);
});

init();

async function init() {
	try {
		server.listen(port, () => {
			console.log(`Express App Listening on Port ${port}`);
		});
	} catch (error) {
		console.error(`An error occurred: ${JSON.stringify(error)}`);
		process.exit(1);
	}
}
