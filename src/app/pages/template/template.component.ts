import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { EncuestasService } from '../../services/encuestas.service';
import { EncuestaModel } from '../../models/models';
import { DocumentReference, AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {
  encuestas: EncuestaModel [] = [];

  constructor(private EncuestasService: EncuestasService, private fb: FormBuilder) {
  }

  ////
  
    get code(){
      return this.registerForm.get('code');
    }

    get observation(){
      return this.registerForm.get('observation');
    }

    get questions(){
      return this.registerForm.get('questions') as FormArray;
    }

    registerForm = this.fb.group({
        id: [''],
        code: [''],
        observation: [''],
        questions: this.fb.array([])
    });
    
    agregarQuestion(){
      const questionFormGroup = this.fb.group({
        name: '',
        reward: ''
      });
      this.questions.push(questionFormGroup);
    }

    cargarData(){
      /*this.forma.setValue({
        {
          code: "",
          observation : "",
          question: {
            name: "",
            reward: ""
          }
        }
      });*/
    }

    saveEncuesta(){
      //console.log(this.registerForm.value);
      if(this.registerForm.invalid){
        return;
      }
  
      // Enviar informacion a FireBase
      let encuesta: EncuestaModel = this.registerForm.value;      
      this.EncuestasService.saveEncuenta(encuesta)
          .then(response => this.handleSuccessfulSaveEncuesta(response, encuesta))
          .catch(err => console.error(err))
      this.refrecar();
    }

  ////

  ngOnInit() {
    this.EncuestasService.getEncuestas().subscribe(encuestas => {
      this.encuestas = encuestas;    
    })
  }

  handleSuccessfulSaveEncuesta(response: DocumentReference, encuesta: EncuestaModel){
    encuesta.id = response.id;
  }

  borrarPreguntas(id: string){
    this.EncuestasService.deletePregunta(id);
  }

  refrecar(){
    this.registerForm.patchValue({
      id: '',
      code: '',
      observation: ''
    });
    this.questions.controls.splice(0, this.questions.length);
  }

  removerQuestion(indice: number){
    this.questions.removeAt(indice);
  }

}
