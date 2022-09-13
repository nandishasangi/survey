import App from '@/app';
import IndexRoute from '@routes/index.route';
import SurveyRoute from '@routes/survey.route';
import QuestionRoute from '@routes/question.route';
import validateEnv from '@utils/validateEnv';
import AudienceRoute from './routes/audience.route';

validateEnv();

const app = new App([new IndexRoute(), new SurveyRoute(), new QuestionRoute(), new AudienceRoute()]);

app.listen();
