const path = require('path');
const express = require('express')
const dotenv = require('dotenv');
const bootcamps = require('./routes/routes');
const courses = require('./routes/courses');
const morgan = require('morgan');
const connectDB = require('../DevCramper_API/config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');
//Load env variables
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());



PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`App Running in ${process.env.NODE_ENV} on PORT ${PORT}`.yellow.bold));

// process.on('unhandledRejection', (err, promise) => {
//     console.log(`Error: ${err.message}`.red);
// });

// server.close(() => {
//     process.exit(1);
// });

// app.use(morgan('dev'));

app.use(fileUpload());

//Set static folder

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/bootcamp', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);