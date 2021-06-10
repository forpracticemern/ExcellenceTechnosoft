const CandidateModel = require('../db/models/candidateSchema');

const candidateCRUD = {
	add(candidate) {
		return CandidateModel.create(candidate);
	},
	search(email) {
		return CandidateModel.findOne({ email });
	},
	searchById(candidate) {
		return CandidateModel.findById({ _id: candidate });
	},
};

module.exports = candidateCRUD;
