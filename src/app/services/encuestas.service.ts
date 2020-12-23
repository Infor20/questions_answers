import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { EncuestaModel } from '../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EncuestasService {

  constructor(private db: AngularFirestore) { 
    //this.encuestaCollectionName = db.collection<EncuestaModel>('Surveys');
    this.encuestasCollection = db.collection<EncuestaModel>('Surveys')
    this.encuestas = this.encuestasCollection.valueChanges();
  } 

  public encuestaCollectionName = 'Surveys';
  private encuestasCollection: AngularFirestoreCollection<EncuestaModel>;
  private encuestas: Observable<EncuestaModel[]>;

  saveEncuenta(encuesta: EncuestaModel) {
    return this.db.firestore.collection(this.encuestaCollectionName).add(encuesta);
  }

  getEncuestas() {
    return this.encuestas = this.encuestasCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as EncuestaModel;
        data. id = action.payload.doc.id;
        return data;
      });
    }));
  }

  /*getOneEncuesta(idEncuesta: string){
    this.encuestaDoc = this.db.doc<EncuestaModel>(`Surveys/${idEncuesta}`);
    return this.encuesta = this.encuestaDoc.snapshotChanges().pipe(map(action =>{
      if(action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as EncuestaModel;
        data.id = action.payload.id;
        return data;
      }
    }));
  }*/

  deletePregunta(id: string){
    return this.db.collection(this.encuestaCollectionName).doc(id).delete();

  }

}
