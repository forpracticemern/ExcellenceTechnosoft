const Candidate = require('../services/candidateCRUD');
const Score = require('../services/scoreCRUD');
const candidateCreate = async (req, res) => {
	try {
		let { name, email, address } = req.body;
		let candidate = await Candidate.search(email);

		if (candidate) {
			return res.json({
				status: 409,
				message: 'Candidate Already Exists',
			});
		}

		let candidateObj = await Candidate.add(req.body);

		return res.json({
			status: 200,
			message: 'Candidate Added Successfully!',
			data: candidateObj,
		});
	} catch (err) {
		return res.json({ status: 503, err: err });
	}
};

const candidateScore = async (req, res) => {
	try {
		let { candidate, score } = req.body;
		let candidateObj = await Candidate.searchById(candidate);
		let { firstRound, secondRound, thirdRound } = score;
		let total = firstRound + secondRound + thirdRound;
		let candidateScoreObj = { candidate, score, total };
		if (candidateObj) {
			await Score.add(candidateScoreObj);
			return res.json({
				status: 200,
				message: 'Score Added Successfully',
			});
		}
		return res.json({ status: 401, message: 'Candidate Does not Exists!' });
	} catch (err) {
		return res.json({ status: 503, err: err });
	}
};

const candidateHighAndAvgScore = async (req, res) => {
	try {
		let maxScore = await Score.getMaxScore();
		let avgScore = await Score.getAvgScore();
		return res.json({
			status: 200,
			message: 'Max and Avg Score',
			data: { maxScore, avgScore },
		});
	} catch (err) {
		return res.json({ status: 503, err: err });
	}
};
module.exports = { candidateCreate, candidateScore, candidateHighAndAvgScore };
