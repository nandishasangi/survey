import BizConstants from "@/constants/biz.constants";
import { Counters } from "@/interfaces/counters.interface";
const { readFileSync, writeFileSync } = require('fs');

class CountersModel {
  static async loadCountersData(): Promise<Counters> {
    try {
      const surveyData: string = readFileSync(BizConstants.COUNTERS_FILE_PATH);
      return JSON.parse(surveyData);
    } catch (error) {
      throw error;
    }
  }

  static async incSurveyCoutner(): Promise<void> {
    try {
      let counters: Counters = await this.loadCountersData();
      writeFileSync(BizConstants.COUNTERS_FILE_PATH, JSON.stringify({ ...counters, survey: ++counters[BizConstants.SURVEY] }), BizConstants.FILE_WRITE_FORMAT);
    } catch (error) {
      throw error;
    }
  }

  static async incQuestionCoutner(): Promise<void> {
    try {
      let counters: Counters = await this.loadCountersData();
      writeFileSync(BizConstants.COUNTERS_FILE_PATH, JSON.stringify({ ...counters, questions: ++counters[BizConstants.QUESTIONS] }), BizConstants.FILE_WRITE_FORMAT);
    } catch (error) {
      throw error;
    }
  }

  static async incAudienceCoutner(): Promise<void> {
    try {
      let counters: Counters = await this.loadCountersData();
      writeFileSync(BizConstants.COUNTERS_FILE_PATH, JSON.stringify({ ...counters, audience: ++counters[BizConstants.AUDIENCE] }), BizConstants.FILE_WRITE_FORMAT);
    } catch (error) {
      throw error;
    }
  }
}

export default CountersModel;
