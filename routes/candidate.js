const express = require('express');
const route = express.Router();

const {
	candidateCreate,
	candidateScore,
	candidateHighAndAvgScore,
} = require('../controllers/candidateController');

const { Joi, celebrate } = require('celebrate');

route.post(
	'/create',
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			address: Joi.string().required(),
		}),
	}),
	candidateCreate
);

route.post(
	'/addScore',
	celebrate({
		body: Joi.object().keys({
			candidate: Joi.string().required(),
			score: Joi.object().keys({
				firstRound: Joi.number().min(0).max(10).required(),
				secondRound: Joi.number().min(0).max(10).required(),
				thirdRound: Joi.number().min(0).max(10).required(),
			}),
		}),
	}),
	candidateScore
);

route.get('/getScore', candidateHighAndAvgScore);

module.exports = route;
