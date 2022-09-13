import { Request } from 'express';
import CountersModel from '@/models/counter.model';
import { Survey } from '@interfaces/survey.interface';
import SurveyModel from '@models/survey.model';
import { filter, remove, map } from 'lodash';
import { Question } from '@/interfaces/question.interface';
import QuestionService from '@services/question.service';
import { Counters } from '@/interfaces/counters.interface';
import BizConstants from '@/constants/biz.constants';

class SurveyService {
  public questionService = new QuestionService();

  public async createSurvey(surveyData: Survey): Promise<void> {
    try {
      let counters: Counters = await CountersModel.loadCountersData();
      await SurveyModel.writeSurveyData({ ...surveyData, id: ++counters[BizConstants.SURVEY], status: BizConstants.ACTIVE, createdAt: new Date() });
      await CountersModel.incSurveyCoutner();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findAllSurvey(): Promise<Survey[]> {
    try {
      return await SurveyModel.loadSurveyData();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findSingleSurvey(id: number): Promise<Survey> {
    try {
      let surveys: Survey[] = await this.findAllSurvey();
      if (!surveys.length) return [] as any;
      const questions: Question[] = await this.questionService.findAllQuestionBySurveyId(id);
      surveys = filter(surveys, { id }) as Array<Survey>;
      return { ...surveys[0], questions: questions };
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updateSurvey(req: Request): Promise<boolean> {
    try {
      let written = false;
      let surveys: Survey[] = await this.findAllSurvey();
      surveys = map(surveys, s => {
        if (s[BizConstants.ID] == parseInt(req.params.id)) {
          s[BizConstants.NAME] = req.body[BizConstants.NAME];
          written = true;
        }
        return s;
      });

      if (!written) return written;
      await SurveyModel.reWriteSurveyData(surveys);
      return written;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findDeleteSurvey(id: number): Promise<void> {
    try {
      const surveys: Survey[] = await this.findAllSurvey();
      remove(surveys, { id: id });
      await SurveyModel.reWriteSurveyData(surveys);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default SurveyService;
