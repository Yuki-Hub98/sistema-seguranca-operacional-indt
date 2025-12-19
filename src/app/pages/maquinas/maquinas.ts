import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaquinasService } from './services/maquinas.service';
import { Maquina } from '../../models/maquina.model';
import { PesquisaMaquinasComponent } from "./components/pesquisa-maquinas/pesquisa-maquinas";
import { TabelaMaquinasComponent } from "./components/tabela-maquinas/tabela-maquinas";
import { FormModalCriaMaquinaComponent } from './components/form-modal-cria-maquina/form-modal-cria-maquina';


@Component({
  selector: 'app-maquinas',
   standalone: true,
  imports: [CommonModule, PesquisaMaquinasComponent, TabelaMaquinasComponent, FormModalCriaMaquinaComponent],
  templateUrl: './maquinas.html',
  styleUrl: './maquinas.css',
})


export class Maquinas implements OnInit {

  maquinas: Maquina[] = [];
  filtro = '';
  abrirModal = false;

  constructor(private maquinasService: MaquinasService) {}

  ngOnInit(): void {
    this.maquinas = this.maquinasService.listar();
  }

  filtrar(valor: string) {
    this.filtro = valor;
  }

  excluirMaquina(id: number) {
    this.maquinasService.excluir(id);
    this.maquinas = this.maquinasService.listar();
  }

  abrirForm() {
    this.abrirModal = true;
  }

  fecharForm() {
  this.abrirModal = false;
  this.maquinas = this.maquinasService.listar();
  }
}