const Joi = require('joi');
import { NextFunction, Request, Response } from 'express';

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

export const validateSurveyPayload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
