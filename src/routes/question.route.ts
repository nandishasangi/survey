import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { validateQuestionPayload } from '@middlewares/question.middleware';
import QuestionController from '@controllers/question.controller';

class SurveyRoute implements Routes {
  public path = '/question';
  public router = Router();
  public questionController = new QuestionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validateQuestionPayload, this.questionController.createQuestion);
    this.router.get(`${this.path}`, this.questionController.getAllQuestion);
    this.router.get(`${this.path}/:id`, this.questionController.getQuestion);
    this.router.get(`${this.path}/survey/:id`, this.questionController.getSurveyQuestions);
    this.router.put(`${this.path}/:id`, validateQuestionPayload, this.questionController.updateQuestion);
    this.router.delete(`${this.path}/:id`, this.questionController.deleteQuestion);
  }
}

export default SurveyRoute;
