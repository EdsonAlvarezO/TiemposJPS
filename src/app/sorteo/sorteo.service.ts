import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Sorteo} from'./sorteo';


@Injectable({
  providedIn: 'root'
})
export class SorteoService {
	private sorteoCollection: AngularFirestoreCollection<Sorteo>;
  sorteos: Observable<Sorteo[]>;
  sorteoDoc:AngularFirestoreDocument<Sorteo>;
  constructor(private readonly afs: AngularFirestore) {
  	this.sorteoCollection = afs.collection<Sorteo>('Sorteos');
    this.sorteos = this.sorteoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Sorteo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

  getSorteos(){
  	return this.sorteos;
  }
  addSorteo(sorteo:Sorteo){
  	this.sorteoCollection.add (JSON.parse (JSON.stringify (sorteo)));
  }

  deleteSorteo(sorteo:Sorteo){
    this.sorteoDoc = this.afs.doc(`Sorteos/${sorteo.id}`);
    this.sorteoDoc.delete();
  }
  updateSorteo(sorteo:Sorteo){
    this.sorteoDoc = this.afs.doc(`Sorteos/${sorteo.id}`);
    this.sorteoDoc.update(sorteo);
  }
}
