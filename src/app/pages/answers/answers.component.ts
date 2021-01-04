import { Component, OnInit } from '@angular/core';
import { AnswersService } from '../../services/answers.service';
import { SurveyAnswer } from '../../models/models_answers';
import { Survey } from '../../models/survey.model';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Panelist } from '../../models/panelists.model';
import { PanelistsService } from '../../services/panelists.service';
import { IQuestion, ISurveyAnswer } from 'src/app/interfaces/ianswers';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})

export class AnswersComponent implements OnInit {
  surveyAnswers: SurveyAnswer = new SurveyAnswer();
  code: string = '';
  phoneNumber: string = '';
  currentSurvey:  Survey = new Survey();
  dataPanelist: Panelist [] = [];
  currentdataPanelist:  Panelist = new Panelist();
  iSurveyAnswers : ISurveyAnswer [] = [];

  constructor(private AnswersService: AnswersService, private SurveyService: SurveyService, private PanelistsService: PanelistsService ,private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getBuscarEncuesta();
  }

  getBuscarEncuesta(){
    //this.SurveyService.getSurveys().subscribe(dataSurvey => {
      this.surveyAnswers.panelistId;
      this.surveyAnswers.surveyId;
      
      // capturando los campos del URL
      this.code = this.activatedRoute.snapshot.paramMap.get('code');
      this.phoneNumber = this.activatedRoute.snapshot.paramMap.get('phoneNumber');
      
      // buscando la informacion de la encuesta por el codigo que viene del URL
      this.SurveyService.getSurveys(ref => ref.where("code", "==", this.code)).subscribe(surveys=> {
        this.currentSurvey = surveys [0];
        this.iSurveyAnswers = this.currentSurvey.questions.map((currentQuestion,index) =>  {
          return { question: currentQuestion.name, questionIndex: index, answer: null, reward: currentQuestion.reward} as ISurveyAnswer
        })
      })

      // buscando la informacion del panelista por numero de telefono que viene del URL
      this.PanelistsService.getPanelists(ref => ref.where("phone", "==", +this.phoneNumber)).subscribe(panelists=> {
        this.currentdataPanelist = panelists [0];
      })

    //})
  }

  async saveAnswers(): Promise<void> {
    try {
    // Enviar informacion a FireBase
    this.surveyAnswers.panelistId = this.currentdataPanelist.id;
    this.surveyAnswers.surveyId = this.currentSurvey.id;
    this.surveyAnswers.questions = this.iSurveyAnswers.map(s=> {return {answer: s.answer, questionIndex: s.questionIndex, reward: s.reward, totalReward: s.reward } as IQuestion});
      await this.AnswersService.saveAnswers(this.surveyAnswers);
    } catch (error) {
      console.log(error);
    }
  }

}

/*saveAnswers(){
    console.log(this.dataSurvey);

    // Enviar informacion a FireBase
   let answer: Survey = this.dataSurvey;      
    this.AnswersService.saveAnswers(answer)
        .then(response => this.handleSuccessfulSaveAnswers(response, answer))
        .catch(err => console.error(err))
    //this.refrecar();
  }
*/