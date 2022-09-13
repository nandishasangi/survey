const Joi = require('joi');
import { NextFunction, Request, Response } from 'express';

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  surveyId: Joi.array().items(Joi.number().integer().required()).required(),
  pValues: Joi.array().items(Joi.string().min(3).max(30).required()).required()
});

export const validateQuestionPayload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const value = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
