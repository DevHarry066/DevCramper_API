const express = require('express')
const dotenv = require('dotenv');

//Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`App Running in ${process.env.NODE_ENV} on PORT ${PORT}`));