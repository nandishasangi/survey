import { NextFunction, Request, Response } from 'express';
import { Survey } from '@interfaces/survey.interface';
import SurveyService from '@services/survey.service';
import { HttpException } from '@/exceptions/HttpException';
import BizConstants from '@/constants/biz.constants';
import ErrConstants from '@/constants/err.constants';

class SurveyController {

  public surveyService = new SurveyService();

  public createSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.surveyService.createSurvey(req.body as Survey);
      res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getAllSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSurveyData: Survey[] = await this.surveyService.findAllSurvey();
      res.status(200).json({ data: findAllSurveyData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findSurveyData: Survey = await this.surveyService.findSingleSurvey(parseInt(req.params.id));

      if(!findSurveyData || findSurveyData[BizConstants.NAME] == undefined) throw new HttpException(400, ErrConstants.INVALID_SURVEY_ID);

      res.status(200).json({ data: findSurveyData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let result: boolean = await this.surveyService.updateSurvey(req);

      if(!result) throw new HttpException(400, ErrConstants.INVALID_SURVEY_ID);

      res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteSurvey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // TODO: Validation need to be handled for 400
      await this.surveyService.findDeleteSurvey(parseInt(req.params.id));
      res.status(200).send();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default SurveyController;
