import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AudienceController from '@controllers/audience.controller';
import { validateAudiencePayload } from '@middlewares/audience.middleware';

class AudienceRoute implements Routes {

  public path = '/audience';
  public router = Router();
  public audienceController = new AudienceController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id`, validateAudiencePayload, this.audienceController.survey);
    this.router.get(`${this.path}/:id`, this.audienceController.getAllAudience);
    this.router.get(`${this.path}/details/:id`, this.audienceController.getAudienceDetails);
  }
}

export default AudienceRoute;