const Joi = require('joi');
import { NextFunction, Request, Response } from 'express';

const schema = Joi.object({
  id: Joi.number().integer().required(),
  answers: Joi.array().items(Joi.string().min(3).max(30).required()).required()
});

export const validateAudiencePayload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(Object.keys(req.body).length){
      await schema.validateAsync(req.body);
    }
    next();
  } catch (error) {
    next(error);
  }
};
