import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../model/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosCollection : AngularFirestoreCollection<Usuario> = this.afs.collection('usuario');

  constructor(private afs: AngularFirestore) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.usuariosCollection.valueChanges();
  }

  addUsuario(u: Usuario) {
    u.id_usuario = this.afs.createId();
    return this.usuariosCollection.doc(u.id_usuario).set(u);
  }

  deleteUsuario(u: Usuario) {
    return this.usuariosCollection.doc(u.id_usuario).delete();
  }

  updateUsuario(u: Usuario) {
    return this.usuariosCollection.doc(u.id_usuario).set(u);
  }

  searchByApeluser(apeluser: string): Observable<Usuario[]> {
    return this.afs.collection<Usuario>('usuario', ref => ref.orderBy('apeluser').startAt(apeluser).endAt(apeluser+"\uf8ff")).valueChanges();
  }
  searchByNome(nome: string): Observable<Usuario[]> {
    return this.afs.collection<Usuario>('nome', ref => ref.orderBy('nome').startAt(nome).endAt(nome+"\uf8ff")).valueChanges();
  }

  

}
