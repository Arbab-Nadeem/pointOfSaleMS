const mongoose = require('mongoose');
const URL =
	'mongodb+srv://rafhi000:AJ925029K@vigo-cluster.i5ixebp.mongodb.net/pos-system';
mongoose
	.connect(URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database connected successfully'))
	.catch((error) => console.log('database connection error', error));
