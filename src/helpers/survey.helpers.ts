const uuid = require('uuid');
import _ from 'lodash';
import { Request, Response } from 'express';
import { writeFileSync, existsSync } from 'fs';
import { pullAllBy, omit, map, filter, intersection, values, keyBy, set, get, includes, compact } from 'lodash';
import { Question } from '@/interfaces/question.interface';
import { Audience } from '@/interfaces/audience.interface';
import BizConstants from '@/constants/biz.constants';

export const checkSurveyFileExists = (fileName: string, surveyNumber: number) => existsSync(`${BizConstants.SURVEY_DIR}/${surveyNumber}-${fileName}.${BizConstants.FILE_EXT}`);

export const createSurveyFile = (req: Request, res: Response) => {
    try {
        let fileName: string = `${Date.now()}-${uuid.v4()}`;
        writeFileSync(`${BizConstants.SURVEY_DIR}/${req.params.id}-${fileName}.${BizConstants.FILE_EXT}`, JSON.stringify([]), BizConstants.FILE_WRITE_FORMAT);
        res.setHeader(BizConstants.X_REQ_ID, fileName);
    } catch (err) {
        throw(err);
    }
}

export const getActiveSurveyFilteredQuestions = (surveyNumber: number, questions: Question[]) => {
    try {
        questions = map(questions, (q: Question) => {
            if(includes(q[BizConstants.SURVEYID], surveyNumber) && q[BizConstants.STATUS] == BizConstants.ACTIVE){
                return omit(q, [BizConstants.STATUS, BizConstants.CREATEDAT]);
            }
            return false;
        });
        return compact(questions);
    } catch (err) {
        throw(err);
    }
}

export const getSurveyFilteredQuestionsByRequestID = (questionNumbers: Array<number>, questions: Question[]) => {
    try {
        return pullAllBy(questions, questionNumbers.map((q) => {return {id: q}}), BizConstants.ID);
    } catch (err) {
        throw(err);
    }
}

export const validateAnswers = (req: Request, questions: Question[]) => {
    try {
        let question = filter(questions, {id: req.body[BizConstants.ID]});

        if(!question.length){
            return false;
        }
        
        return req.body[BizConstants.ANSWERS].length == intersection(question[0].pValues, req.body[BizConstants.ANSWERS]).length;
    } catch (err) {
        throw(err);
    }
}

export const overrideAnswersIfExists = (req: Request, audience: boolean | Audience[]) => {
    try {
        if(!audience || !audience.length) return [req.body];
        audience = keyBy(audience, BizConstants.ID);
        set(audience, req.body.id, {id: req.body.id, answers: req.body.answers});
        return values(audience, BizConstants.ID);
    } catch (err) {
        throw(err);
    }
}

export const getUsedQuestionIDList = (req: Request, audience: Audience[]) => {
    try {
        return _.chain(audience).keyBy(BizConstants.ID).keys().map(k => parseInt(k)).union([req.body[BizConstants.ID]]).uniq().value()
    } catch (err) {
        throw(err);
    }
}

export const mapSurveyQuestionsByIdList = (audienceData: Audience, questionData: Question[]) => {
    try {
        questionData = keyBy(questionData, BizConstants.ID);

        audienceData = map(audienceData, (ad: Audience) => {
            set(ad, BizConstants.QUESTION, get(questionData[ad[BizConstants.ID]], BizConstants.NAME, ""));
            return ad;
        });

        return audienceData
    } catch (err) {
        throw(err);
    }
}