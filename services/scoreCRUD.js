const CandidateModel = require('../db/models/candidateSchema');
const ScoreModel = require('../db/models/testScoreSchema');

const scoreCRUD = {
	add(candidateScores) {
		return ScoreModel.create(candidateScores);
	},

	getMaxScore() {
		// return ScoreModel.aggregate([
		// 	{
		// 		$project: {
		// 			'Max Score': {
		// 				$max: '$total',
		// 			},
		// 		},
		// 	},
		// ]);
		return ScoreModel.find({}, { total: 1, _id: 0 })
			.sort({ total: -1 })
			.limit(1)
			.populate('candidate', { name: 1, _id: 0 });
	},

	getAvgRoundScore() {
		return ScoreModel.aggregate([
			{
				$group: {
					_id: 0,
					'First Round': { $avg: '$score.firstRound' },
					'Second Round': { $avg: '$score.secondRound' },
					'Third Round': { $avg: '$score.thirdRound' },
				},
			},
		]);
	},

	getAvgScore() {
		return ScoreModel.aggregate([
			{
				$project: {
					_id: 0,
					candidate: 1,
					'Avg Score': {
						$avg: ['$score.firstRound', '$score.secondRound', '$thirdRound'],
					},
				},
			},
		]);
	},
};

module.exports = scoreCRUD;
