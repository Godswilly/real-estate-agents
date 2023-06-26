const ErrorHandler = require('../utils/asyncHandle');

const SequelizeConnectionError = (err) => {
	const message = `Something went wrong`;
	return new ErrorHandler(message, 500);
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.error('ERROR', err);
		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!',
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV !== 'production') {
		sendErrorDev(err, res);
	} else {
		let error = { ...err };
		error.message = err.message;
		if (err.name === 'SequelizeConnectionError')
			error = SequelizeConnectionError();
		sendErrorProd(error, res);
	}
};
