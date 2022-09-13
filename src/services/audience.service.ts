import { Request } from 'express';
import { Audience } from '@interfaces/audience.interface';
import AudienceModel from '@models/audience.model';
import BizConstants from '@/constants/biz.constants';

class AudienceService {
  public async findAllAudience(fileName: String): Promise<Audience[] | boolean> {
    try {
      return await AudienceModel.loadAudienceData(fileName);
    } catch (error) {
      throw error;
    }
  }

  public async findAllAudienceBySurveyId(id: number): Promise<String[]> {
    try {
      return await AudienceModel.loadAllAudienceData(id);
    } catch (error) {
      throw error;
    }
  }

  public async findAudienceByFileName(fileName: String): Promise<any> {
    try {
      return await AudienceModel.loadAudienceData(fileName);
    } catch (error) {
      throw error;
    }
  }

  public async findAudience(req: Request): Promise<Audience[] | boolean> {
    try {
      return await AudienceModel.loadAudienceData(`${req.params.id}-${req.headers[BizConstants.X_REQ_ID]}`);
    } catch (error) {
      throw error;
    }
  }

  public async writeAudience(req: Request, data: Audience[]): Promise<void> {
    try {
      return await AudienceModel.reWriteAudienceData(`${req.params.id}-${req.headers[BizConstants.X_REQ_ID]}`, data);
    } catch (error) {
      throw error;
    }
  }
}

export default AudienceService;
