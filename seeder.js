const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load ENV 
dotenv.config({ path: './config/config.env' });

//Load Models
const Bootcamp = require('./model/Bootcamp');

mongoose
    .connect(process.env.MONGO_URI, {
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

//Read JSON

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf8'));

//Import JSON into DB
const importData = async () => {
    try {
        console.log('Importing');
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

//Delete JSON into DB
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Deleted...'.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}