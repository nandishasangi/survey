import { NextFunction, Request, Response } from 'express';
import { Question } from '@interfaces/question.interface';
import QuestionService from '@services/question.service';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'lodash';
import ErrConstants from '@/constants/err.constants';

class QuestionController {

  public questionService = new QuestionService();

  public createQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.questionService.createQuestion(req.body as Question);
      res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getAllQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllQuestionData: Question[] = await this.questionService.findAllQuestion();
      res.status(200).json({ data: findAllQuestionData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findQuestionData: Question = await this.questionService.findSingleQuestion(parseInt(req.params.id));
      if(!findQuestionData || isEmpty(findQuestionData)) throw new HttpException(400, ErrConstants.INVALID_QUESTION_ID);
      res.status(200).json({ data: findQuestionData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getSurveyQuestions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findQuestionData: Question[] = await this.questionService.findAllQuestionBySurveyId(parseInt(req.params.id));
      res.status(200).json({ data: findQuestionData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let result: boolean = await this.questionService.updateQuestion(req);
      if(!result)throw new HttpException(400, ErrConstants.INVALID_QUESTION_ID);
      res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.questionService.findDeleteQuestion(parseInt(req.params.id));
      res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default QuestionController;
