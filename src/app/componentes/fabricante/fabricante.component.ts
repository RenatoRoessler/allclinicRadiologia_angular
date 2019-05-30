import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FabricanteService } from 'src/app/service/fabricante.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Fabricante } from 'src/app/model/fabricante.model';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.css']
})
export class FabricanteComponent implements OnInit {

  onEdit: boolean = false;
  fabricante$: Observable<Fabricante[]>;
  displayedColumns = ['descricao','especificacao','acoes'];
  descricao: FormControl = new FormControl('');  

  FabricanteForm = this.fb.group({
    id_fabriante: [undefined],
    descricao: ['',[Validators.required, Validators.minLength(3)]],
    especificacao: ['', [Validators.required, Validators.minLength(3)]],
    id_instituicao: [undefined]
  })

  constructor(
    private fb: FormBuilder,
    private fabricanteService: FabricanteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fabricante$ = this.fabricanteService.getFabricantes();
  }

  edit(f: Fabricante) {
    this.FabricanteForm.setValue(f);
    this.alteraOnEdit();
  }

  alteraOnEdit() {  
    this.onEdit = !this.onEdit;
  }

  formReset() {
    this.FabricanteForm.reset({
      id_fabriante: undefined,
      descricao: '',
      especificacao: '',
      id_instituicao: undefined
    })
  }

  updateFabricante(f: Fabricante) {
    this.fabricanteService.updateFabricante(f)
      .then(() => {
        this.snackBar.open('Fabricante editado com Sucesso', 'OK', {duration: 3000});
        this.formReset();
        this.onEdit = false;6
      })
      .catch(() => {
        this.snackBar.open('Erro ao editar o Fabricante', 'OK', {duration: 3000})
      })
  }

  addInstituicao(f: Fabricante) {
    this.fabricanteService.addFabricante(f)
      .then(() => {
        this.snackBar.open('Fabricante adicionado com Sucesso', 'OK', {duration: 3000});
        this.formReset();
        this.onEdit = false;
      })
      .catch(() => {
        this.snackBar.open('Erro ao adicionar fabricante', 'OK', {duration: 3000});
      })
  }

  UpperCase(f: Fabricante) {
    f.descricao = f.descricao.toUpperCase();
    f.especificacao = f.especificacao.toUpperCase();
    return f;
  }

  del(f: Fabricante) {
    this.fabricanteService.deleteFabricante(f)
      .then(() => {
        this.snackBar.open('Fabricante Excluido com sucesso', 'OK', {duration: 3000})
      })
      .catch(() => {
        this.snackBar.open('Eroo ao Excluir Fabricante', 'OK', {duration: 3000})
      })
  }

  novo() {
    this.formReset();
    this.alteraOnEdit();
  }

  onSubmit() {
    let f: Fabricante = this.FabricanteForm.value;
    f = this.UpperCase(f);
    if(!f.id_fabricante) {
      this.addInstituicao(f);
    } else {
      this.updateFabricante(f);
    }
  }

}
