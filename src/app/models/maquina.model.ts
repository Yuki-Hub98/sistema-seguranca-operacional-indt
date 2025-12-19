import { CommonModule } from '@angular/common';

imports: [CommonModule]

export interface Maquina {
  id: number;
  nome: string;
  codigo: string;
  tipo: string;
  status: 'OPERACIONAL' | 'MANUTENCAO' | 'DESATIVADA';
}