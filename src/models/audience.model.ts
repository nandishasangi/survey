import { startsWith } from 'lodash';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { Audience } from '@/interfaces/audience.interface';
import BizConstants from '@/constants/biz.constants';

class AudienceModel {
  static async loadAudienceData(fileName: String): Promise<Audience[] | boolean> {
    try {
      const audienceData: any = readFileSync(`${BizConstants.SURVEY_DIR}/${fileName}.${BizConstants.FILE_EXT}`);
      return JSON.parse(audienceData);
    } catch (error) {
      return false;
    }
  }

  static async reWriteAudienceData(fileName: string, data: Audience[]): Promise<void> {
    try {
      writeFileSync(`${BizConstants.SURVEY_DIR}/${fileName}.${BizConstants.FILE_EXT}`, JSON.stringify(data), BizConstants.FILE_WRITE_FORMAT);
    } catch (error) {
      throw error;
    }
  }

  static async loadAllAudienceData(surveyNumber: number): Promise<Array<String>> {
    const matchedFiles: String[] = [];
    try {
      const files = readdirSync(BizConstants.SURVEY_DIR);

      files.forEach(file => {
        if (startsWith(file, `${surveyNumber}-`)) {
          matchedFiles.push(file.split('.')[0]);
        }
      });
      return matchedFiles;
    } catch (error) {
      return matchedFiles;
    }
  }
}

export default AudienceModel;
