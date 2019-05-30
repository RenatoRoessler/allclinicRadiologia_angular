import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { InstituicaoComponent } from './componentes/instituicao/instituicao/instituicao.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { FarmacoComponent } from './componentes/farmaco/farmaco.component';
import { FabricanteComponent } from './componentes/fabricante/fabricante.component';


@NgModule({
  declarations: [
    AppComponent,
    InstituicaoComponent,
    UsuariosComponent,
    FarmacoComponent,
    FabricanteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
