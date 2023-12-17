const express = require('express')
const dotenv = require('dotenv');
const bootcamps = require('./routes/routes');
const morgan = require('morgan');
const connectDB = require('../DevCramper_API/config/db');
const colors = require('colors');

//Load env variables
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`App Running in ${process.env.NODE_ENV} on PORT ${PORT}`.yellow.bold));

// process.on('unhandledRejection', (err, promise) => {
//     console.log(`Error: ${err.message}`.red);
// });

// server.close(() => {
//     process.exit(1);
// });

app.use(morgan('dev'));

app.use('/api/v1/bootcamp', bootcamps);

