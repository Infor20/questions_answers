import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-template',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent implements OnInit {
  surveys: Survey [] = [];
  newSurvey: Survey = new Survey();

  constructor(private SurveyService: SurveyService) {}
    
    agregarQuestion(){
      this.newSurvey.questions.push({name: '', reward: 0});
    }

    async saveEncuesta(): Promise<void> {
      try {
      // Enviar informacion a FireBase
        await this.SurveyService.saveEncuenta(this.newSurvey);
      } catch (error) {
        console.log(error);
      }
    }

  ngOnInit() {
    this.SurveyService.getSurveys().subscribe(surveys => {
      this.surveys = surveys;    
    })
  }

  deleteSurveys(id: string){
    this.SurveyService.deleteSurvey(id);
  }

  /*refrecar(){
    this.registerForm.patchValue({
      id: '',
      code: '',
      observation: ''
    });
    this.questions.controls.splice(0, this.questions.length);
  }*/

  removerQuestion(indice: number){
    this.newSurvey.questions.splice(indice, 1);
  }

}
