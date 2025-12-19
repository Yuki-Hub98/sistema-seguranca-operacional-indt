import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Maquina } from '../../../../models/maquina.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-tabela-maquinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-maquinas.html'
})
export class TabelaMaquinasComponent {

  @Input() maquinas: Maquina[] = [];
  @Input() filtro = '';
  @Output() excluir = new EventEmitter<number>();

  get maquinasFiltradas() {
    return this.maquinas.filter(m =>
      m.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
