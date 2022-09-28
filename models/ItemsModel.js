const mongoose = require('mongoose');
const itemsSchema = mongoose.Schema(
	{
		item: { type: String, required: true },
		quantity: { type: Number, required: true },
		category: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
);
const ItemsModel = mongoose.model('items', itemsSchema);
module.exports = ItemsModel;
