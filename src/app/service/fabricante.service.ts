import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Fabricante } from '../model/fabricante.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  private fabricanteCollection: AngularFirestoreCollection<Fabricante> = this.afs.collection('fabricante');

  constructor( private afs: AngularFirestore) { }

  getFabricantes(): Observable<Fabricante[]> {
    return this.fabricanteCollection.valueChanges();
  }

  addFabricante(f: Fabricante) {
    f.id_fabricante = this.afs.createId();
    return this.fabricanteCollection.doc(f.id_fabricante).set(f);
  }

  deleteFabricante(f: Fabricante) {
    return this.fabricanteCollection.doc(f.id_fabricante).delete();
  }

  updateFabricante(f: Fabricante) {
    return this.fabricanteCollection.doc(f.id_fabricante).set(f);
  }
}
