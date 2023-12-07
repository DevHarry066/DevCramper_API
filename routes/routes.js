const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
	res.status(200).json({ success: true, message: "Show All bootcamps"});
});

router.get('/:id', (req, res) => {
	res.status(200).json({ success: true, message: `Show bootcamp of id ${req.params.id}`});
});

router.post('/', (req, res) => {
	res.status(200).json({ success: true, message: "Created new bootcamps"});
});

router.put('/:id', (req, res) => {
	res.status(200).json({ success: true, message: `update bootcamp of ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
	res.status(200).json({ success: true, message: `delete bootcamp of ${req.params.id}` });
});

module.exports = router