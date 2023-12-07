const express = require('express')
const dotenv = require('dotenv');

//Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`App Running in ${process.env.NODE_ENV} on PORT ${PORT}`));

app.get('/api/v1/bootcamp', (req, res) => {
	res.status(200).json({ success: true, message: "Show All bootcamps"});
});

app.get('/api/v1/bootcamp/:id', (req, res) => {
	res.status(200).json({ success: true, message: `Show bootcamp of id ${req.params.id}`});
});

app.post('/api/v1/bootcamp', (req, res) => {
	res.status(200).json({ success: true, message: "Created new bootcamps"});
});

app.put('/api/v1/bootcamp/:id', (req, res) => {
	res.status(200).json({ success: true, message: `update bootcamp of ${req.params.id}` });
});

app.delete('/api/v1/bootcamp/:id', (req, res) => {
	res.status(200).json({ success: true, message: `delete bootcamp of ${req.params.id}` });
});