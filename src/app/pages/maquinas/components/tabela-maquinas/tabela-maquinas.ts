import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Maquina } from '../../../../models/maquina.model';
import { from } from 'rxjs';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabela-maquinas',
  standalone: true,
  imports: [CommonModule, FaIconComponent, FaIconComponent],
  templateUrl: './tabela-maquinas.html'
})
export class TabelaMaquinasComponent {

  readonly faPenToSquare = faPenToSquare;
  readonly faTrashCan = faTrashCan;

  @Input() maquinas: Maquina[] = [];
  @Input() filtro = '';
  @Output() excluir = new EventEmitter<number>();

  get maquinasFiltradas() {
    return this.maquinas.filter(m =>
      m.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
