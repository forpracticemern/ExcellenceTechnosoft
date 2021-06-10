const mongoose = require('../connection');
const Schema = mongoose.Schema;

const TestScoreSchema = new Schema(
	{
		candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'candidates' },
		score: { type: Object },
		total: { type: Number },
	},
	{ timestamps: true }
);

const TestScoresModel = mongoose.model('test_scores', TestScoreSchema);

module.exports = TestScoresModel;
