import { Router } from 'express';
import SurveyController from '@controllers/survey.controller';
import { Routes } from '@interfaces/routes.interface';
import { validateSurveyPayload } from '@middlewares/survey.middleware';

class SurveyRoute implements Routes {
  public path = '/survey';
  public router = Router();
  public surveyController = new SurveyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validateSurveyPayload, this.surveyController.createSurvey);
    this.router.get(`${this.path}`, this.surveyController.getAllSurvey);
    this.router.get(`${this.path}/:id`, this.surveyController.getSurvey);
    this.router.put(`${this.path}/:id`, validateSurveyPayload, this.surveyController.updateSurvey);
    this.router.delete(`${this.path}/:id`, this.surveyController.deleteSurvey);
  }
}

export default SurveyRoute;