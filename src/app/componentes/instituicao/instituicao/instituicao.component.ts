import { Component, OnInit } from '@angular/core';
import { InstituicaoService } from 'src/app/service/instituicao.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Instituicao } from 'src/app/model/instituicao.model';

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css']
})
export class InstituicaoComponent implements OnInit {

  onEdit: boolean = false;
  instituicoes$: Observable<Instituicao[]>;
  displayedColumns = ['razao','fantasia', 'cnpj', 'endereco', 'telefone1', 'telefone2', 'acoes'];
  razao: FormControl = new FormControl('');
  fantasia: FormControl = new FormControl('');

  instituicaoForm = this.fb.group({
    id: [undefined],
    razao: ['', [Validators.required, Validators.minLength(3)]],
    fantasia: ['', [Validators.required, Validators.minLength(3)]],
    cnpj: [0, [Validators.required, Validators.min(9)]],
    endereco: ['', [Validators.required, Validators.minLength(5)]],
    numero: [0, [Validators.required]],
    bairro: ['', [Validators.required, Validators.minLength(3)]],
    cidade: ['', [Validators.required, Validators.minLength(3)]],
    telefone1: ['', [Validators.required]],
    telefone2: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
      private fb: FormBuilder,
      private instituicaoService: InstituicaoService,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.instituicoes$ = this.instituicaoService.getInstituicoes();
  }

  edit(i: Instituicao){
    this.instituicaoForm.setValue(i);
    this.alteraOnEdit();   
  }

  alteraOnEdit() {
    this.onEdit = !this.onEdit;
  }

  cancel() {
    this.alteraOnEdit();      
  }

  onSubmit() {
    let i: Instituicao = this.instituicaoForm.value;
    if(!i.id) {
      this.addInstituicao(i);
    }else {
      this.updateInstituicao(i);
    }

  }

  updateInstituicao(i: Instituicao) {
    this.instituicaoService.updateInstituicao(i)
      .then(() => {
        this.snackBar.open('Instituição Editada com Sucesso', 'OK', {duration: 3000}),
        this.formRest();
        this.onEdit = false;
      })
      .catch(() =>{
        this.snackBar.open('Erro ao Editar a Instituição', 'OK', {duration: 3000})
      })
  }  

  addInstituicao(i: Instituicao) {
    this.instituicaoService.addInstituicao(i)
      .then(() => {
        this.snackBar.open('Instituição adicionada com Sucesso', 'OK', {duration: 3000}),
        this.formRest();
        this.onEdit = false;
      })
      .catch(() =>{
        this.snackBar.open('Erro ao Adicionar a Instituição', 'OK', {duration: 3000})
      })
  }

  del(i: Instituicao) {
    this.instituicaoService.deleteInstituicao(i)
      .then(() => {
        this.snackBar.open('Instituição Excluida com Sucesso', 'OK', {duration: 3000})
      })
      .catch(() =>{
        this.snackBar.open('Erro ao Excluida a Instituição', 'OK', {duration: 3000})
      })
  }

  formRest() {
    this.instituicaoForm.reset({
      id: undefined,
      razao: '',
      fantasia: '',
      cnpj: 0,
      endereco: '',
      numero: 0,
      bairro: '',
      cidade: '',
      telefone1: '',
      telefone2: '',
      email: '',
    });
  }

  novo() {
    this.formRest();
    this.alteraOnEdit();   
  }

  filterFantasia(event) {
    this.instituicoes$ = this.instituicaoService.searchByfantasia(event.target.value);    
  }

  filterRazao(event) {
    this.instituicoes$ = this.instituicaoService.searchByRazao(event.target.value);    
  }

}
