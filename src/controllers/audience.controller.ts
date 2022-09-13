import _ from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { Audience } from '@interfaces/audience.interface';
import AudienceService from '@services/audience.service';
import { createSurveyFile, getActiveSurveyFilteredQuestions, getSurveyFilteredQuestionsByRequestID, validateAnswers, checkSurveyFileExists, overrideAnswersIfExists, getUsedQuestionIDList , mapSurveyQuestionsByIdList} from '../helpers/survey.helpers';
import QuestionService from '@/services/question.service';
import { HttpException } from '@/exceptions/HttpException';
import { Question } from '@/interfaces/question.interface';
import ErrConstants from '@/constants/err.constants';
import BizConstants from '@/constants/biz.constants';

class AudienceController {

  public audienceService = new AudienceService();
  public questionService = new QuestionService();

  public getAllAudience = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAudienceData: String[] = await this.audienceService.findAllAudienceBySurveyId(parseInt(req.params.id));
      res.status(200).json({ data: findAllAudienceData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getAudienceDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAudienceData: Audience = await this.audienceService.findAudienceByFileName(req.params.id);
      if(!findAudienceData) throw new HttpException(400, ErrConstants.INVALID_SURVEY_AUDIENCE_ID);
      const questionData: Question[] = await this.questionService.findAllQuestionBySurveyId(parseInt(req.params.id.split("-")[0]));
      res.status(200).json({ data: mapSurveyQuestionsByIdList(findAudienceData, questionData) });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public survey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      let questions: Question[] = await this.questionService.findAllQuestion();

      questions = getActiveSurveyFilteredQuestions(parseInt(req.params.id), questions);
      
      if(!questions.length){
        throw new HttpException(400, ErrConstants.INVALID_SURVEY_ID);
      }

      if(!req.headers[BizConstants.X_REQ_ID] || !checkSurveyFileExists(req.headers[BizConstants.X_REQ_ID] as string, parseInt(req.params.id))){
        createSurveyFile(req, res);
      }else{
        
        if(!validateAnswers(req, questions)) {
          throw new HttpException(400, ErrConstants.INVALID_OPTIONS);
        }
        
        let audience: Audience[] | boolean = await this.audienceService.findAudience(req);

        audience = overrideAnswersIfExists(req, audience);
        
        await this.audienceService.writeAudience(req, audience as Audience[]);
        
        let usedQuestionIDList = getUsedQuestionIDList(req, audience as Audience[]);
        
        questions = getSurveyFilteredQuestionsByRequestID(usedQuestionIDList, questions);
      }
      
      res.status(200).send(questions[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default AudienceController;


// Database Connection [15 Mins]
// Postman Collection, examples setup, API Documentation [30 Mins]
// Readme Documentation [1 Hours]

// https://www.getpostman.com/collections/413ea6e92968fea5164d