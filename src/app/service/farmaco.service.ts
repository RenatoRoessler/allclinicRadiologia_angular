import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Farmaco } from '../model/farmaco.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmacoService {

  private farmacoCollection: AngularFirestoreCollection<Farmaco> = this.afs.collection('farmaco')

  constructor(private afs: AngularFirestore) { }

  getFarmacos(): Observable<Farmaco[]> {
    return this.farmacoCollection.valueChanges();
  }

  addFarmaco(f: Farmaco) {
    f.id_farmaco = this.afs.createId();
    return this.farmacoCollection.doc(f.id_farmaco).set(f);
  }

  deleteFarmaco(f: Farmaco){
    return this.farmacoCollection.doc(f.id_farmaco).delete();
  }

  updateFarmacao(f: Farmaco) {
    return this.farmacoCollection.doc(f.id_farmaco).set(f);
  }

}
