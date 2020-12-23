import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/firestore';
import { AnswersModel } from '../models/models_answers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private db: AngularFirestore) {
    this.encuestasCollection = db.collection<AnswersModel>('Surveys')
    this.encuestas = this.encuestasCollection.valueChanges();

    this.answersCollection = db.collection<AnswersModel>('SurveysAnswered')
    this.answers = this.answersCollection.valueChanges();
   }

   
   private encuestasCollection: AngularFirestoreCollection<AnswersModel>;
   private encuestas: Observable<AnswersModel[]>;

   private answersCollectionName = 'SurveysAnswered';
   private answersCollection: AngularFirestoreCollection<AnswersModel>;
   private answers: Observable<AnswersModel[]>;

  getEncuestas() {
    return this.encuestas = this.encuestasCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as AnswersModel;
        data. id = action.payload.doc.id;
        return data;
      });
    }));
  }

  saveAnswers(answers: AnswersModel) {
    return this.db.firestore.collection(this.answersCollectionName).add(answers);
  }

  /*getAll(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<AnswersModel>(this.answersCollectionName, ref => ref.orderBy('lastModifiedDate', 'desc')).get();
   }*/



}
