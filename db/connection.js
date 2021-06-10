const mongoose = require('mongoose');

const dbOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

mongoose.connect(process.env.DB_URL, dbOptions, (err) => {
	if (err) {
		console.log('Error Connecting Databsae', err);
	} else {
		console.log('Connected to MongoDB');
	}
});

module.exports = mongoose;
