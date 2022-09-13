import { Request } from 'express';
import CountersModel from '@/models/counter.model';
import { Question } from '@interfaces/question.interface';
import QuestionModel from '@models/question.model';
import { filter, remove, map, omit, includes, compact } from 'lodash';
import { Counters } from '@/interfaces/counters.interface';
import BizConstants from '@/constants/biz.constants';

class QuestionService {
  public async createQuestion(questionData: Question): Promise<void> {
    try {
      // TODO: Survey IDs need to be validated
      let counters: Counters = await CountersModel.loadCountersData();
      await QuestionModel.writeQuestionData({ ...questionData, id: ++counters[BizConstants.QUESTIONS], status: BizConstants.ACTIVE, createdAt: new Date() });
      await CountersModel.incQuestionCoutner();
    } catch (error) {
      throw error;
    }
  }

  public async findAllQuestion(): Promise<Question[]> {
    try {
      return await QuestionModel.loadQuestionData();
    } catch (error) {
      throw error;
    }
  }

  public async findSingleQuestion(id: number): Promise<Question> {
    try {
      const questions: Question[] = await this.findAllQuestion();
      return filter(questions, { id });
    } catch (error) {
      throw error;
    }
  }

  public async updateQuestion(req: Request): Promise<boolean> {
    try {
      // TODO: Survey IDs need to be validated
      let written = false;
      let questions: Question[] = await this.findAllQuestion();
      questions = map(questions, s => {
        if (s['id'] == parseInt(req.params.id)) {
          written = true;
          return { ...s, ...req.body };
        }
        return s;
      });
      if (!written) return written;
      await QuestionModel.reWriteQuestionData(questions);
      return written;
    } catch (error) {
      throw error;
    }
  }

  public async findDeleteQuestion(id: number): Promise<void> {
    try {
      // TODO: Validation need to be handled for 400
      const questions: Question[] = await this.findAllQuestion();
      remove(questions, { id: id });
      await QuestionModel.reWriteQuestionData(questions);
    } catch (error) {
      throw error;
    }
  }

  public async findAllQuestionBySurveyId(id: number): Promise<Question[]> {
    try {
      let questions = await QuestionModel.loadQuestionData();
      questions = map(questions, q => {
        if (includes(q[BizConstants.SURVEYID], id)) {
          return omit(q, BizConstants.SURVEYID);
        }
      });
      return compact(questions);
    } catch (error) {
      throw error;
    }
  }
}

export default QuestionService;
