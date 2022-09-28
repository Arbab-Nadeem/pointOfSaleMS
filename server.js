// import modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbConnect = require('./databaseConnection');
const path = require('path');
// app
const app = express();

// routes

app.use(express.json());
const itemsRoute = require('./routes/itemsRoute');
const userRoute = require('./routes/userRoute');
const billsRoute = require('./routes/billsRoute');

app.use('/api/items/', itemsRoute);
app.use('/api/users/', userRoute);
app.use('/api/bills/', billsRoute);

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
	});
}

// middleware
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));

// port

const port = process.env.PORT || 5000;

// listners

app.get('/', (req, res) => res.send('Hello World from home api'));
app.listen(port, () => console.log(`server is running at port  ${port}`));
