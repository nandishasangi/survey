import BizConstants from "@/constants/biz.constants";
import { Survey } from "@/interfaces/survey.interface";
const { readFileSync, writeFileSync } = require('fs');

class SurveyModel {
  static async loadSurveyData(): Promise<Array<Survey>> {
    try {
      const surveyData: string = readFileSync(BizConstants.SURVEY_FILE_PATH);
      return JSON.parse(surveyData);
    } catch (error) {
      throw error;
    }
  }

  static async writeSurveyData(data: Survey): Promise<void> {
    try {
      let surveyData: Survey[] = await this.loadSurveyData();
      if (!surveyData) surveyData = [];
      writeFileSync(BizConstants.SURVEY_FILE_PATH, JSON.stringify([...surveyData, data]), BizConstants.FILE_WRITE_FORMAT);
    } catch (error) {
      throw error;
    }
  }

  static async reWriteSurveyData(data: Survey[]): Promise<void> {
    try {
      writeFileSync(BizConstants.SURVEY_FILE_PATH, JSON.stringify(data), BizConstants.FILE_WRITE_FORMAT);
    } catch (error) {
      throw error;
    }
  }
}

export default SurveyModel;
