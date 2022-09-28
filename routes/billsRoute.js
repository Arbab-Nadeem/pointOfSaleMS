const express = require('express');
const router = express.Router();
const BillsModel = require('../models/BillsModel');

/* ######### Imports ########## */

/* ######### Get All Charge Bill ########## */

router.post('/charge-bill', async (req, res) => {
	try {
		const newBill = new BillsModel(req.body);
		await newBill.save();
		res.send('Bill charged successfully');
	} catch (error) {
		res.status(400).json(error);
	}
});

/* ######### Get All Bills ########## */

router.get('/get-all-bills', async (req, res) => {
	try {
		const bills = await BillsModel.find();
		res.send(bills);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
