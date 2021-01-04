export interface IAnswer {
    id?: string;
    questions: IQuestion[];
    surveyId: string;
    panelistId: string;
}

export interface IQuestion {
    answer: string;
    questionIndex: number;
    reward: number;
    totalReward: number;
}

export interface ISurveyAnswer {
    question: string
    questionIndex: number
    answer: string
    reward: number
}