import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Instituicao } from '../model/instituicao.model';

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  private instituicaoCollection : AngularFirestoreCollection<Instituicao> = this.afs.collection('instituicao')

  constructor(private afs: AngularFirestore) { }

  getInstituicoes() : Observable<Instituicao[]> {
    return this.instituicaoCollection.valueChanges();
  }

  addInstituicao(i: Instituicao) {
    i.id = this.afs.createId()
    return this.instituicaoCollection.doc(i.id).set(i);
  } 

  deleteInstituicao(i: Instituicao) {
    return this.instituicaoCollection.doc(i.id).delete();
  }

  updateInstituicao(i: Instituicao) {
    return this.instituicaoCollection.doc(i.id).set(i)
  }

  searchByRazao(razao: string): Observable<Instituicao[]> {
    return this.afs.collection<Instituicao>('instituicao', ref => ref.orderBy('razao').startAt(razao).endAt(razao+"\uf8ff")).valueChanges()
  }

  searchByfantasia(fantasia: string): Observable<Instituicao[]> {
    return this.afs.collection<Instituicao>('instituicao', ref => ref.orderBy('fantasia').startAt(fantasia).endAt(fantasia+"\uf8ff")).valueChanges()
  }

  
}
