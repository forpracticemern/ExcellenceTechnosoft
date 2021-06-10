const mongoose = require('../connection');
const Schema = mongoose.Schema;

const CandidateSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: true },
	},
	{ timestamps: true }
);

const CandidateModel = mongoose.model('candidates', CandidateSchema);

module.exports = CandidateModel;
