import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { InstituicaoComponent } from './componentes/instituicao/instituicao/instituicao.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { FarmacoComponent } from './componentes/farmaco/farmaco.component';
import { FabricanteComponent } from './componentes/fabricante/fabricante.component';

const routes: Routes = [];
const appRoutes : Routes = [
  { path: 'instituicao', component: InstituicaoComponent}, 
  { path: 'usuario', component: UsuariosComponent},
  { path: 'farmaco', component: FarmacoComponent},
  { path: 'fabricante', component: FabricanteComponent}
  
] 

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
