import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pesquisa-maquinas',
  templateUrl: './pesquisa-maquinas.html'
})
export class PesquisaMaquinasComponent {
  @Output() pesquisar = new EventEmitter<string>();
}