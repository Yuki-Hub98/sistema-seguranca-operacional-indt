import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChart } from '../../core/components/pie-chart/pie-chart';
import { ChecklistDetailModal } from '../../core/components/checklist-detail-modal/checklist-detail-modal';
import { ChecklistService } from '../checklists/services/checklist.service';
import { MaquinasService } from '../maquinas/services/maquinas.service';
import { Checklist, ChecklistStatus } from '../../models/checklist.model';

@Component({
  selector: 'app-home',
  imports: [PieChart, CommonModule, ChecklistDetailModal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private checklistService = inject(ChecklistService);
  private maquinasService = inject(MaquinasService);

  checklists = computed(() => this.checklistService.getChecklists());

  // Estatísticas gerais (podem ser calculadas dinamicamente também)
  funcionariosAtivos = 156;
  maquinasCadastradas = computed(() => this.maquinasService.listar().length);
  
  checklistHoje = computed(() => {
    const hoje = new Date().toDateString();
    return this.checklists().filter(c => 
      new Date(c.dataCriacao).toDateString() === hoje
    ).length;
  });

  alertasPendentes = computed(() => {
    return this.checklists().filter(c => 
      c.status === ChecklistStatus.VALIDADO || 
      c.status === ChecklistStatus.REPROVADO ||
      c.status === ChecklistStatus.ATIVO ||
      c.status === ChecklistStatus.EM_VALIDACAO
    ).length;
  });

  // Calcula dados do gráfico dinamicamente
  checklistData = computed(() => {
    const all = this.checklists();
    const total = all.length;
    
    if (total === 0) {
      return [
        { label: 'Aprovados', value: 0, color: '#10b981' },
        { label: 'Ativos', value: 0, color: '#3b82f6' },
        { label: 'Pendentes', value: 0, color: '#eab308' },
        { label: 'Reprovados', value: 0, color: '#ef4444' }
      ];
    }

    const aprovados = all.filter(c => c.status === ChecklistStatus.APROVADO).length;
    const ativos = all.filter(c => c.status === ChecklistStatus.ATIVO).length;
    const reprovados = all.filter(c => c.status === ChecklistStatus.REPROVADO).length;
    const pendentes = all.filter(c => 
      c.status === ChecklistStatus.EM_VALIDACAO || 
      c.status === ChecklistStatus.VALIDADO
    ).length;

    return [
      { 
        label: 'Aprovados', 
        value: Math.round((aprovados / total) * 100), 
        color: '#10b981' 
      },
      { 
        label: 'Ativos', 
        value: Math.round((ativos / total) * 100), 
        color: '#3b82f6' 
      },
      { 
        label: 'Pendentes', 
        value: Math.round((pendentes / total) * 100), 
        color: '#eab308' 
      },
      { 
        label: 'Reprovados', 
        value: Math.round((reprovados / total) * 100), 
        color: '#ef4444' 
      }
    ];
  });
  
  get percentualAprovados(): number {
    return this.checklistData()[0].value;
  }

  get percentualAtivos(): number {
    return this.checklistData()[1].value;
  }

  get percentualPendentes(): number {
    return this.checklistData()[2].value;
  }

  get percentualReprovados(): number {
    return this.checklistData()[3].value;
  }

  checklistsPendentes = computed(() => {
    return this.checklists()
      .filter(c => 
        c.status === 'VALIDADO' || 
        c.status === 'REPROVADO' || 
        c.status === 'ATIVO' ||
        c.status === 'EM_VALIDACAO'
      )
      .sort((a, b) => {
        // Prioriza reprovados
        if (a.status === 'REPROVADO' && b.status !== 'REPROVADO') return -1;
        if (a.status !== 'REPROVADO' && b.status === 'REPROVADO') return 1;
        
        // Depois validados aguardando aprovação
        if (a.status === 'VALIDADO' && b.status !== 'VALIDADO') return -1;
        if (a.status !== 'VALIDADO' && b.status === 'VALIDADO') return 1;
        
        // Depois por itens críticos
        const aCritico = this.temItemCritico(a);
        const bCritico = this.temItemCritico(b);
        if (aCritico && !bCritico) return -1;
        if (!aCritico && bCritico) return 1;
        
        // Por último, por data mais recente
        const aData = a.validacoes?.[0]?.dataValidacao || a.dataCriacao;
        const bData = b.validacoes?.[0]?.dataValidacao || b.dataCriacao;
        return new Date(bData).getTime() - new Date(aData).getTime();
      })
      .slice(0, 5); // Limita a 5 alertas mais relevantes
  });

  temItemCritico(checklist: Checklist): boolean {
    return checklist.itens.some((item) => 
      item.criticidade === 'CRITICA' || item.criticidade === 'ALTA'
    );
  }

  // Modal de detalhes da reprovação
  checklistReprovadoSelecionado = signal<Checklist | null>(null);
  mostrarModalReprovacao = signal(false);

  abrirModalReprovacao(checklist: Checklist) {
    this.checklistReprovadoSelecionado.set(checklist);
    this.mostrarModalReprovacao.set(true);
  }

  fecharModalReprovacao() {
    this.mostrarModalReprovacao.set(false);
    this.checklistReprovadoSelecionado.set(null);
  }

  // Modal de detalhes
  checklistSelecionado = signal<Checklist | null>(null);
  mostrarModal = signal(false);

  abrirModal(checklist: Checklist) {
    this.checklistSelecionado.set(checklist);
    this.mostrarModal.set(true);
  }

  fecharModal() {
    this.mostrarModal.set(false);
    this.checklistSelecionado.set(null);
  }
}
