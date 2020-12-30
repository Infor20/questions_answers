import { IQuestion, ISurvey } from '../interfaces/isurvey.interfaces';

export class Survey implements ISurvey {
    id: string = ''
    name: string = ''
    code: string = ''
    observation: string = ''
    questions: IQuestion[] = []
    reward: string = ''

    constructor(isurvey?: ISurvey){
        Object.assign(this, isurvey)
    }

    public model(id?:string): ISurvey{
        return {
            id: this.id || id,
            name: this.name,
            code: this.code,
            observation: this.observation,
            questions: this.questions,
            reward: this.reward
        };
    }
}


