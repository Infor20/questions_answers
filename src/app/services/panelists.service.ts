import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, QueryFn } from '@angular/fire/firestore';
import { IPanelists } from '../interfaces/ipanelists';
import { Panelist } from '../models/panelists.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PanelistsService {

  constructor(private db: AngularFirestore) { }

  public collections = 'panelists';

  public getCollection(queryFn?: QueryFn): AngularFirestoreCollection<IPanelists>{
    return this.db.collection<IPanelists>(this.collections, queryFn)
  }

  public getPanelists(queryFn?: QueryFn): Observable<Panelist[]>{
    return this.getCollection(queryFn).valueChanges({ idField: 'id' }).pipe(map(panelist => panelist.map(panelist => new Panelist(panelist))))
  }

}
