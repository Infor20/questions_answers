export interface IAnswer {
    id?: string;
    questions: IQuestion[];
    surveyId: string;
    panelistId: string;
    surveyQuestions: ISurveyAnswer[];
}

export interface IQuestion {
    answer: string;
    questionId: string;
    reward: number;
    totalReward: number;
}

export interface ISurveyAnswer {
    question: string
    questionId: number
    answer: string
}