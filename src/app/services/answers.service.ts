import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentReference, QueryFn  } from '@angular/fire/firestore';
import { SurveyAnswer } from '../models/models_answers';
import { Survey } from '../models/survey.model';
import { Panelist } from '../models/panelists.model';
import { IAnswer } from '../interfaces/ianswers';
import { ISurvey } from '../interfaces/isurvey.interfaces';
import { IPanelists } from '../interfaces/ipanelists';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AnswersService {

  constructor(private db: AngularFirestore) {}

  public collectionsSurveysAnswered = 'SurveysAnswered';
  public collectionsSurveys = 'Surveys';

  public getCollection(queryFn?: QueryFn): AngularFirestoreCollection<ISurvey>{
    return this.db.collection<ISurvey>(this.collectionsSurveys, queryFn)
  }

  public getSurveys(queryFn?: QueryFn): Observable<Survey[]>{
    return this.getCollection(queryFn).valueChanges({ idField: 'id' }).pipe(map(surveys => surveys.map(survey => new Survey(survey))))
  }

  public getDocument(id: string): AngularFirestoreDocument<IAnswer>{
    return this.db.doc<IAnswer>(`${this.collectionsSurveysAnswered}/${id}`)
  }

  saveAnswers(answers: SurveyAnswer) {
    const surveyanswerId =  this.db.createId();
    return this.getDocument(surveyanswerId).set(answers.model(surveyanswerId));
    //return this.db.firestore.collection(this.collectionsSurveysAnswered).add(answers);
  }

  public getQuery(code: string, phoneNumber: string): AngularFirestoreDocument<IAnswer>{
    return this.db.doc<IAnswer>(`${this.collectionsSurveysAnswered}/${code}`)
  }

}

/*this.encuestasCollection = db.collection<Survey>('Surveys')
this.encuestas = this.encuestasCollection.valueChanges();

this.answersCollection = db.collection<Answers>('SurveysAnswered')
this.answers = this.answersCollection.valueChanges();*/

/*getEncuestas() {
  return this.encuestas = this.encuestasCollection.snapshotChanges()
  .pipe(map( changes => {
    return changes.map( action => {
      const data = action.payload.doc.data() as AnswersModel;
      data. id = action.payload.doc.id;
      return data;
    });
  }));
}*/

/* private answersCollection: AngularFirestoreCollection<Answers>;
private answers: Observable<Answers[]>;*/


/*private encuestasCollection: AngularFirestoreCollection<Survey>;
private encuestas: Observable<Survey[]>;

public answersCollection: AngularFirestoreCollection<Answers>;
public answers: Observable<Answers[]>;*/

/*public getSurveys(queryFn?: QueryFn): Observable<Survey[]>{
  return this.encuestasCollection(QueryFn).valueChanges().pipe(map(encuestas => encuentas.map(encuestas => new AnswersModel(encuestas))))
}*/
