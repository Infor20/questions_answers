import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AnswersService } from '../../services/answers.service';
import { SurveyAnswer } from '../../models/models_answers';
import { DocumentReference, AngularFirestore } from '@angular/fire/firestore';
import { Survey } from '../../models/survey.model';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute } from '@angular/router';
import { Panelist } from '../../models/panelists.model';
import { PanelistsService } from '../../services/panelists.service';
import { ISurveyAnswer } from 'src/app/interfaces/ianswers';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})

export class AnswersComponent implements OnInit {
  dataQuestions: SurveyAnswer [] = [];
  dataSurvey: Survey [] = [];
  answer: string [] = [];
  surveyAnswers: SurveyAnswer = new SurveyAnswer();
  code: string = '';
  phoneNumber: string = '';
  currentSurvey:  Survey = new Survey();
  dataPanelist: Panelist [] = [];
  currentdataPanelist:  Panelist = new Panelist();
  SurveyAnswers : ISurveyAnswer[] = [];

  constructor(private AnswersService: AnswersService, private SurveyService: SurveyService, private PanelistsService: PanelistsService ,private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getBuscarEncuesta();
  }

  getBuscarEncuesta(){
    this.SurveyService.getSurveys().subscribe(dataSurvey => {
      this.surveyAnswers.panelistId;
      this.surveyAnswers.surveyId;
      
      this.code = this.activatedRoute.snapshot.paramMap.get('code');
      this.phoneNumber = this.activatedRoute.snapshot.paramMap.get('phoneNumber');
      
      this.SurveyService.getSurveys(ref => ref.where("code", "==", this.code)).subscribe(surveys=> {
        this.currentSurvey = surveys [0];
        this.currentSurvey.push(this.SurveyAnswers);

      })

      



      this.PanelistsService.getPanelists(ref => ref.where("phone", "==", +this.phoneNumber)).subscribe(panelists=> {
        this.currentdataPanelist = panelists [0];
      })

      //console.log(this.code + ' ' + this.phoneNumber);
      //console.log(dataSurvey);
      this.dataSurvey = dataSurvey;
    })
  }

  async saveAnswers(): Promise<void> {
    try {
    // Enviar informacion a FireBase
      await this.AnswersService.saveAnswers(this.surveyAnswers);
    } catch (error) {
      console.log(error);
    }
  }

}



  /*registerForm = this.fb.group({
    id: [''],
    prueba: [''],
    questions: this.fb.array([
      this.fb.group({
        answers: this.fb.array([
          this.fb.group({
            answer: ['']
          })
        ])
      })
    ])
  });*/

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
