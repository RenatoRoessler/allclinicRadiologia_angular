import { Component, OnInit, Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from 'src/app/model/usuario.model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { MatSnackBar } from '@angular/material';
import { Instituicao } from 'src/app/model/instituicao.model';
import { InstituicaoService } from 'src/app/service/instituicao.service';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {

  onEdit: boolean = false;
  usuarios$: Observable<Usuario[]>;
  instituicoes: Instituicao[] = [];
  displayedColumns = ['login','nome','email','cidade', 'acoes'];
  login: FormControl = new FormControl('');
  nome: FormControl = new FormControl('');
  private unsubscribe$: Subject<any> = new Subject();

  usuarioForm = this.fb.group({
    id_usuario: [undefined],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    apeluser: ['', [Validators.required, Validators.minLength(3)]],
    bairro: ['', [Validators.required, Validators.minLength(3)]],
    cidade: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', [Validators.required, Validators.minLength(3)]],
    numero: ['', [Validators.required, Validators.minLength(3)]],
    senha: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required, Validators.minLength(3)]],
    nascimento: [new Date(), [Validators.required]],
    cpf: ['', [Validators.required]],
    id_instituicao: ['', [Validators.required]]
  });

  constructor( 
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private instituicaoService: InstituicaoService,
    private SnackBar: MatSnackBar,
    private ref: ElementRef) { }

  ngOnInit() {
    this.usuarios$ = this.usuarioService.getUsuarios();
    this.instituicaoService.getInstituicoes()
      .pipe( takeUntil(this.unsubscribe$) )
      .subscribe((inst) =>  {
        this.instituicoes = inst;
        console.log('inst',inst)
      });
  }

  UpperCase(u: Usuario) {
    u.nome = u.nome.toUpperCase();
    u.cidade = u.cidade.toUpperCase();
    u.apeluser = u.apeluser.toUpperCase();
    return u;
  }

  onSubmit() {
    let u: Usuario = this.usuarioForm.value;
    u = this.UpperCase(u);    
    if(!u.id_usuario) {
      this.addUsuario(u);
    } else {
      this.updateUsuario(u);
    }
  }

  addUsuario(u: Usuario) {
    this.usuarioService.addUsuario(u)
      .then(() => {
        this.SnackBar.open('Usuário Cadastrado com Sucesso', 'OK', {duration: 3000}),
        this.formReset();
        this.onEdit = false;
      })
      .catch(() => {
        this.SnackBar.open('Erro ao Adicionar Usuário', 'OK', {duration: 3000})
      });
  }

  updateUsuario(u: Usuario) {
    this.usuarioService.updateUsuario(u)
      .then(() =>{
        this.SnackBar.open('Usuario editado com Sucesso', 'OK', {duration: 3000}),
        this.formReset();
        this.onEdit = false;
      })
      .catch(() => {
        this.SnackBar.open('Erro ao Editar um Usuário', 'OK', {duration: 3000})
      })
  }

  formReset() {
    this.usuarioForm.reset({
      id_usuario: undefined,
      nome: '',
      apeluser: '',
      bairro: '',
      cidade: '',
      email: '',
      endereco: '',
      numero: '',
      senha: '',
      telefone: '',
      nascimento: new Date(),
      cpf: '',
      id_instituicao: ''
    });
  }

  edit(u: Usuario) {
    this.usuarioForm.setValue(u);
    this.onEdit = !this.onEdit;
  }

  alteraOnEdit() {
    this.onEdit = !this.onEdit;
  }

  ngOnDestroy(){
    this.unsubscribe$.next();    
  }

  novo() {
    this.alteraOnEdit();   
  }

  cancel() {
    this.alteraOnEdit();      
  }

  del(u: Usuario) {
    this.usuarioService.deleteUsuario(u)
      .then(() => {
        this.SnackBar.open('Usuario Excluido com Sucesso', 'OK', {duration: 3000})
      })
      .catch(() => {
        this.SnackBar.open('Erro ao Excluir o Usuário', 'OK', {duration: 3000})
      })
  }

  filterApeluser(event) {
    if(event.target.value == "") {
      this.usuarios$ = this.usuarioService.getUsuarios();
    }else {
      this.usuarios$ = this.usuarioService.searchByApeluser(event.target.value.toUpperCase());
    }
  }

  filterName(event) {
    if( event.target.value == "") {
      this.usuarios$ = this.usuarioService.getUsuarios();
    }else {
      this.usuarios$ = this.usuarioService.searchByNome(event.target.value.toUpperCase());
    }
    
  }



}
