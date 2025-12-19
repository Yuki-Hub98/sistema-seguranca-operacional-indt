import { Component } from '@angular/core';
import { PieChart } from '../../core/components/pie-chart/pie-chart';

@Component({
  selector: 'app-home',
  imports: [PieChart],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  funcionariosAtivos = 156;
  maquinasCadastradas = 57;
  checklistHoje = 27;
  alertasPendentes = 3;

  checklistData = [
    { label: 'Aprovados', value: 85, color: '#10b981' },
    { label: 'Pendentes', value: 10, color: '#eab308' },
    { label: 'Reprovados', value: 5, color: '#ef4444' }
  ];
  
  get percentualAprovados(): number {
    return this.checklistData[0].value;
  }

  get percentualPendentes(): number {
    return this.checklistData[1].value;
  }

  get percentualReprovados(): number {
    return this.checklistData[2].value;
  }
}
