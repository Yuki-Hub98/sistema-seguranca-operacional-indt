import { Injectable } from '@angular/core';
import { Maquina } from '../../../models/maquina.model';

@Injectable({
  providedIn: 'root'
})
export class MaquinasService {

  private maquinas: Maquina[] = [
    { id: 1, nome: 'Prensa Hidráulica', codigo: 'PH-001', tipo: 'Prensa', status: 'OPERACIONAL' },
    { id: 2, nome: 'Torno CNC', codigo: 'TC-015', tipo: 'Torno', status: 'OPERACIONAL' },
    { id: 3, nome: 'Fresadora Universal', codigo: 'FU-008', tipo: 'Fresadora', status: 'MANUTENCAO' },
    { id: 4, nome: 'Empilhadeira', codigo: 'EMP-007', tipo: 'Veículo', status: 'DESATIVADA' }
  ];

  listar(): Maquina[] {
    return this.maquinas;
  }

  adicionar(maquina: Maquina) {
    this.maquinas.push(maquina);
  }

  excluir(id: number) {
    this.maquinas = this.maquinas.filter(m => m.id !== id);
  }
}