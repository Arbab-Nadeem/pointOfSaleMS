const express = require('express');
const router = express.Router();
const ItemsModel = require('../models/ItemsModel');

/* ######### Imports ########## */
/* ######### Get All Items API ########## */

router.get('/get-all-items', async (req, res) => {
	try {
		const items = await ItemsModel.find();
		res.send(items);
	} catch (error) {
		res.status(400).json(error);
	}
});

/* ######### Add Item API ########## */

router.post('/add-item', async (req, res) => {
	try {
		const newItem = new ItemsModel(req.body);
		await newItem.save();
		res.send('Item added successfully');
	} catch (error) {
		res.status(400).json(error);
	}
});

/* ######### Edit Item API ########## */

router.post('/edit-item', async (req, res) => {
	try {
		await ItemsModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
		res.send('Item Updated Successfully');
	} catch (error) {
		res.status(400).json(error);
	}
});

/* ######### Delete Item API ########## */

router.post('/delete-item', async (req, res) => {
	try {
		await ItemsModel.findOneAndDelete({ _id: req.body.itemId });
		res.send('Item Deleted Successfully');
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
