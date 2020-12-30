export interface ISurvey {
    id?: string;
    code: string;
    observation: string;
    questions: IQuestion[];
    name: string;
    reward: string;
}

export interface IQuestion {
    name: string;
    reward: number;
}
