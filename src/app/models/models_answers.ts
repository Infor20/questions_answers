import { IAnswer,IQuestion } from '../interfaces/ianswers';

export class SurveyAnswer implements IAnswer {
    id: string = null
    questions: IQuestion[] = []
    surveyId: string = null
    panelistId: string = null

    constructor(ianswers?: IAnswer){
        Object.assign(this, ianswers)
    }

    public model(id?:string): IAnswer{
        return {
            id: this.id || id,
            questions: this.questions,
            surveyId: this.surveyId,
            panelistId: this.panelistId
        };
    }
}



