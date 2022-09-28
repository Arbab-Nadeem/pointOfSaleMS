const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

/* ######### Add Item API ########## */

router.post('/login', async (req, res) => {
	try {
		const user = await UserModel.findOne({
			userId: req.body.userId,
			password: req.body.password,
			verified: true,
		});
		if (user) {
			res.send(user);
		} else {
			res.status(400).json({ message: 'Login Failed' });
		}
	} catch (error) {
		res.status(400).json(error);
	}
});
router.post('/signup', async (req, res) => {
	try {
		const newUser = new UserModel({ ...req.body, verified: false });
		await newUser.save();
		res.send('User Registered Successfully');
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
