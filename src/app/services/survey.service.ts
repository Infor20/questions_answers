import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ISurvey } from '../interfaces/isurvey.interfaces';
import { Survey } from '../models/survey.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private db: AngularFirestore) {}

  public collections = 'Surveys';

  public getCollection(queryFn?: QueryFn): AngularFirestoreCollection<ISurvey>{
    return this.db.collection<ISurvey>(this.collections, queryFn)
  }

  public getSurveys(queryFn?: QueryFn): Observable<Survey[]>{
    return this.getCollection(queryFn).valueChanges({ idField: 'id' }).pipe(map(survey => survey.map(survey => new Survey(survey))))
  }

  public getDocument(id: string): AngularFirestoreDocument<ISurvey>{
    return this.db.doc<ISurvey>(`${this.collections}/${id}`)
  }

  saveEncuenta(encuesta: Survey): Promise<void> {
    const surveyId =  this.db.createId();
    return this.getDocument(surveyId).set(encuesta.model(surveyId));
    //return this.db.firestore.collection(this.collections).add(encuesta.model());
  }

  deleteSurvey(id: string){
    return this.db.collection(this.collections).doc(id).delete();
  }

}
