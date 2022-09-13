import BizConstants from "@/constants/biz.constants";
import { Question } from "@/interfaces/question.interface";

const { readFileSync, writeFileSync } = require('fs');

class QuestionModel {
  static async loadQuestionData(): Promise<Array<Question>> {
    try {
      const questionData: string = readFileSync(BizConstants.QUESTION_FILE_PATH);
      return JSON.parse(questionData);
    } catch (error) {
      throw error;
    }
  }

  static async writeQuestionData(data: Question): Promise<void> {
    try {
      let questionData: Question[] = await this.loadQuestionData();
      if (!questionData) questionData = [];
      writeFileSync(BizConstants.QUESTION_FILE_PATH, JSON.stringify([...questionData, data]), BizConstants.FILE_WRITE_FORMAT);
    } catch (error) {
      throw error;
    }
  }

  static async reWriteQuestionData(data: Question[]): Promise<void> {
    try {
      writeFileSync(BizConstants.QUESTION_FILE_PATH, JSON.stringify(data), BizConstants.FILE_WRITE_FORMAT);
    } catch (error) {
      throw error;
    }
  }
}

export default QuestionModel;
