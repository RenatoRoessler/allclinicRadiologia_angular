import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fabricante } from 'src/app/model/fabricante.model';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { FarmacoService } from 'src/app/service/farmaco.service';
import { MatSnackBar } from '@angular/material';
import { Farmaco } from 'src/app/model/farmaco.model';

@Component({
  selector: 'app-farmaco',
  templateUrl: './farmaco.component.html',
  styleUrls: ['./farmaco.component.css']
})
export class FarmacoComponent implements OnInit {

  onEdit: boolean = false;
  farmaco$: Observable<Farmaco[]>
  displayedColumns = ['descricao','fabricante','ativo','ph_superior','ph_inferior', 'solv_organico', 'solv_inorganico', 'acoes' ];
  descricao: FormControl = new FormControl('');

  farmacoForm = this.fb.group({
    id_farmaco: [undefined],
    descricao: ['', [Validators.required, Validators.minLength(3)]],
    ph_superior: [0, [Validators.required]],
    ph_inferior: [0, [Validators.required]],
    solv_organico: [0, [Validators.required]],
    solv_inorganico: [0, [Validators.required]],
    id_instituicao: [undefined],
    ativo: [false, [Validators.required]],
    id_fabricante: [undefined, [Validators.required]]
  })


  constructor(
    private fb: FormBuilder,
    private farmacoService: FarmacoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.farmaco$ = this.farmacoService.getFarmacos();  
  }

  edit(f: Farmaco) {
    this.farmacoForm.setValue(f);
    this.alteraOnEdit();
  }

  alteraOnEdit() {
    this.onEdit = !this.onEdit;
  }

  formReset() {
    this.farmacoForm.reset({
      id_farmaco: undefined,
      descricao: '',
      ph_superior: 0 ,
      ph_inferior: 0,
      solv_organico: [0, [Validators.required]],
      solv_inorganico: [0, [Validators.required]],
      id_instituicao: [undefined],
      ativo: [false, [Validators.required]],
      id_fabricante: [undefined, [Validators.required]]
    })
  }

  addFarmaco(f: Farmaco) {
    this.farmacoService.addFarmaco(f)
      .then(() => {
        this.snackBar.open('Farmaco Cadastrado com sucesso', 'OK', {duration: 3000});
        this.formReset();
        this.onEdit =  false;
      })
      .catch(() => {
        this.snackBar.open('Erro ao cadastar Farmaco', 'OK', {duration: 3000})
      })
  }

  updateFarmaco(f: Farmaco) {
    this.farmacoService.addFarmaco(f)
      .then(() => {
        this.snackBar.open('Farmaco atualizado com Sucesso', 'OK', {duration: 3000});
        this.formReset();
        this.onEdit = false;
      })
      .catch(() => {
        this.snackBar.open('Erro ao adicionar Farmaco', 'OK', {duration: 3000})
      })
  }

  onSubmit() {
    let f: Farmaco =  this.farmacoForm.value;
    if(!f.id_farmaco) {
      this.addFarmaco(f)
    } else {
      this.updateFarmaco(f);
    }
  }

  novo() {
    this.formReset();
    this.alteraOnEdit();
  }

}
