import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AnswersService } from '../../services/answers.service';
import { AnswersModel } from '../../models/models_answers';
import { DocumentReference, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})

export class AnswersComponent implements OnInit {
  dataQuestions: AnswersModel [] = [];
  answer: string = '';


  constructor(private AnswersService: AnswersService, private fb: FormBuilder) {}


  ngOnInit(): void {
    this.getBuscarEncuestas();
  }

  getBuscarEncuestas(){
    this.AnswersService.getEncuestas().subscribe(encuestas => {
      this.dataQuestions = encuestas;
    })
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

  
  saveAnswers(){
    console.log(this.dataQuestions);
    /*//console.log(this.registerForm.value);
    if(this.registerForm.invalid){
      return;
    }*/

    // Enviar informacion a FireBase
    /*let answers: AnswersService = this.dataQuestions;      
    this.AnswersService.saveAnswers(answers)
        .then(response => this.handleSuccessfulSaveAnswers(response, answers))
        .catch(err => console.error(err))
    //this.refrecar();*/
  }

  handleSuccessfulSaveAnswers(response: DocumentReference, answers: AnswersService){
    //encuesta.id = response.id;
  }

}
