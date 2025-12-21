import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { ChecklistService } from './services/checklist.service';
import { ChecklistDetailModal } from '../../core/components/checklist-detail-modal/checklist-detail-modal';
import { Checklist, ChecklistStatus, ChecklistItem } from '../../models/checklist.model';
import { UserRole } from '../../models/user';

@Component({
  selector: 'app-checklists',
  imports: [CommonModule, FormsModule, ChecklistDetailModal],
  templateUrl: './checklists.html',
  styleUrl: './checklists.css',
})
export class Checklists {
  private authService = inject(AuthService);
  private checklistService = inject(ChecklistService);

  currentUser = this.authService.currentUser;
  UserRole = UserRole;
  ChecklistStatus = ChecklistStatus;

  // Controle de views
  view = signal<'lista' | 'criar' | 'validar' | 'aprovar'>('lista');
  checklistSelecionado = signal<Checklist | null>(null);
  
  // Modal de detalhes
  mostrarModalDetalhes = signal(false);
  checklistParaDetalhes = signal<Checklist | null>(null);

  // Listas
  checklists = computed(() => this.checklistService.getChecklists());
  checklistsFiltrados = computed(() => {
    const user = this.currentUser();
    if (!user) return [];

    const all = this.checklists();

    // Admin vê todos
    if (user.roles === UserRole.ADMIN) return all;

    // Operador vê apenas checklists ativos para validar
    if (user.roles === UserRole.OPERADOR) {
      return all.filter(c => 
        c.status === ChecklistStatus.ATIVO || 
        c.status === ChecklistStatus.EM_VALIDACAO
      );
    }

    // Supervisor vê apenas checklists validados para aprovar
    if (user.roles === UserRole.SUPERVISOR) {
      return all.filter(c => 
        c.status === ChecklistStatus.VALIDADO ||
        c.status === ChecklistStatus.APROVADO ||
        c.status === ChecklistStatus.REPROVADO
      );
    }

    return [];
  });

  // Formulário de criação (Admin)
  novoChecklist = signal({
    titulo: '',
    descricao: '',
    maquinaId: 1,
    maquinaNome: '',
    status: ChecklistStatus.RASCUNHO,
    itens: [] as Omit<ChecklistItem, 'id'>[]
  });

  novoItem = signal({
    descricao: '',
    ordem: 1,
    criticidade: 'MEDIA' as 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA'
  });

  // Formulário de validação (Operador)
  validacaoForm = signal<{
    [itemId: number]: { validado: boolean; observacao: string }
  }>({});

  observacaoGeralValidacao = signal('');

  // Formulário de aprovação (Supervisor)
  aprovacaoForm = signal({
    aprovado: true,
    motivo: '',
    observacoes: ''
  });

  // Métodos para atualizar signals com ngModel
  atualizarTitulo(valor: string) {
    this.novoChecklist.update(c => ({ ...c, titulo: valor }));
  }

  atualizarMaquinaNome(valor: string) {
    this.novoChecklist.update(c => ({ ...c, maquinaNome: valor }));
  }

  atualizarDescricao(valor: string) {
    this.novoChecklist.update(c => ({ ...c, descricao: valor }));
  }

  atualizarStatus(valor: ChecklistStatus) {
    this.novoChecklist.update(c => ({ ...c, status: valor }));
  }

  atualizarItemDescricao(valor: string) {
    this.novoItem.update(i => ({ ...i, descricao: valor }));
  }

  atualizarItemCriticidade(valor: 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA') {
    this.novoItem.update(i => ({ ...i, criticidade: valor }));
  }

  atualizarObservacaoItem(itemId: number, valor: string) {
    this.validacaoForm.update(f => ({
      ...f,
      [itemId]: { ...f[itemId], observacao: valor }
    }));
  }

  atualizarObservacaoGeral(valor: string) {
    this.observacaoGeralValidacao.set(valor);
  }

  setAprovado(aprovado: boolean) {
    this.aprovacaoForm.update(f => ({ ...f, aprovado }));
  }

  atualizarMotivoReprovacao(valor: string) {
    this.aprovacaoForm.update(f => ({ ...f, motivo: valor }));
  }

  atualizarObservacoesAprovacao(valor: string) {
    this.aprovacaoForm.update(f => ({ ...f, observacoes: valor }));
  }

  // Ações de navegação
  voltarParaLista() {
    this.view.set('lista');
    this.checklistSelecionado.set(null);
    this.resetForms();
  }

  abrirCriarChecklist() {
    this.view.set('criar');
    this.resetForms();
  }

  abrirValidarChecklist(checklist: Checklist) {
    this.checklistSelecionado.set(checklist);
    this.view.set('validar');
    this.inicializarValidacaoForm(checklist);
  }

  abrirAprovarChecklist(checklist: Checklist) {
    this.checklistSelecionado.set(checklist);
    this.view.set('aprovar');
  }

  verDetalhes(checklist: Checklist) {
    this.checklistParaDetalhes.set(checklist);
    this.mostrarModalDetalhes.set(true);
  }

  fecharModalDetalhes() {
    this.mostrarModalDetalhes.set(false);
    this.checklistParaDetalhes.set(null);
  }

  // Ações do Admin
  adicionarItemNovoChecklist() {
    const item = this.novoItem();
    if (!item.descricao.trim()) return;

    this.novoChecklist.update(checklist => ({
      ...checklist,
      itens: [
        ...checklist.itens,
        { ...item, ordem: checklist.itens.length + 1 }
      ]
    }));

    this.novoItem.set({
      descricao: '',
      ordem: 1,
      criticidade: 'MEDIA'
    });
  }

  removerItemNovoChecklist(index: number) {
    this.novoChecklist.update(checklist => ({
      ...checklist,
      itens: checklist.itens.filter((_, i) => i !== index)
    }));
  }

  salvarChecklist() {
    const checklist = this.novoChecklist();
    const user = this.currentUser();
    if (!user) return;

    if (!checklist.titulo.trim() || checklist.itens.length === 0) {
      alert('Preencha o título e adicione pelo menos um item');
      return;
    }

    this.checklistService.criarChecklist({
      titulo: checklist.titulo,
      descricao: checklist.descricao,
      maquinaId: checklist.maquinaId,
      maquinaNome: checklist.maquinaNome,
      criadoPor: user.id,
      criadoPorNome: `${user.firstName} ${user.lastName || ''}`.trim(),
      status: checklist.status,
      itens: checklist.itens.map((item, index) => ({
        ...item,
        id: Date.now() + index,
        ordem: index + 1
      }))
    });

    alert('Checklist criado com sucesso!');
    this.voltarParaLista();
  }

  deletarChecklist(id: number) {
    if (confirm('Tem certeza que deseja deletar este checklist?')) {
      this.checklistService.deletarChecklist(id);
    }
  }

  alternarStatusChecklist(checklist: Checklist) {
    const novoStatus = checklist.status === ChecklistStatus.ATIVO 
      ? ChecklistStatus.ARQUIVADO 
      : ChecklistStatus.ATIVO;
    
    this.checklistService.atualizarChecklist(checklist.id, { status: novoStatus });
  }

  // Ações do Operador
  inicializarValidacaoForm(checklist: Checklist) {
    const form: { [itemId: number]: { validado: boolean; observacao: string } } = {};
    checklist.itens.forEach(item => {
      form[item.id] = {
        validado: item.validado || false,
        observacao: item.observacao || ''
      };
    });
    this.validacaoForm.set(form);
    this.observacaoGeralValidacao.set('');
  }

  toggleValidacaoItem(itemId: number) {
    this.validacaoForm.update(form => ({
      ...form,
      [itemId]: {
        ...form[itemId],
        validado: !form[itemId].validado
      }
    }));
  }

  salvarValidacao() {
    const checklist = this.checklistSelecionado();
    const user = this.currentUser();
    if (!checklist || !user) return;

    const form = this.validacaoForm();
    const itensValidados = Object.entries(form).map(([itemId, data]) => ({
      itemId: parseInt(itemId),
      validado: data.validado,
      observacao: data.observacao || undefined
    }));

    const todosValidados = itensValidados.every(item => item.validado);
    
    if (!todosValidados && !confirm('Alguns itens não foram validados. Deseja continuar?')) {
      return;
    }

    this.checklistService.validarChecklist(
      checklist.id,
      user.id,
      `${user.firstName} ${user.lastName || ''}`.trim(),
      itensValidados,
      this.observacaoGeralValidacao() || undefined
    );

    alert('Validação salva com sucesso!');
    this.voltarParaLista();
  }

  // Ações do Supervisor
  aprovar() {
    const checklist = this.checklistSelecionado();
    const user = this.currentUser();
    if (!checklist || !user) return;

    const form = this.aprovacaoForm();
    
    // Validar se motivo é obrigatório quando reprovar
    if (!form.aprovado && !form.motivo.trim()) {
      alert('O motivo da reprovação é obrigatório');
      return;
    }
    
    this.checklistService.aprovarChecklist(
      checklist.id,
      user.id,
      `${user.firstName} ${user.lastName || ''}`.trim(),
      form.aprovado,
      form.motivo,
      form.observacoes || undefined
    );

    alert(`Checklist ${form.aprovado ? 'aprovado' : 'reprovado'} com sucesso!`);
    this.voltarParaLista();
  }

  // Helpers
  resetForms() {
    this.novoChecklist.set({
      titulo: '',
      descricao: '',
      maquinaId: 1,
      maquinaNome: '',
      status: ChecklistStatus.RASCUNHO,
      itens: []
    });
    this.novoItem.set({
      descricao: '',
      ordem: 1,
      criticidade: 'MEDIA'
    });
    this.validacaoForm.set({});
    this.observacaoGeralValidacao.set('');
    this.aprovacaoForm.set({
      aprovado: true,
      motivo: '',
      observacoes: ''
    });
  }

  getCriticidadeColor(criticidade: string): string {
    const colors = {
      'BAIXA': 'bg-blue-100 text-blue-800',
      'MEDIA': 'bg-yellow-100 text-yellow-800',
      'ALTA': 'bg-orange-100 text-orange-800',
      'CRITICA': 'bg-red-100 text-red-800'
    };
    return colors[criticidade as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }

  getStatusColor(status: ChecklistStatus): string {
    const colors = {
      [ChecklistStatus.RASCUNHO]: 'bg-gray-100 text-gray-800',
      [ChecklistStatus.ATIVO]: 'bg-green-100 text-green-800',
      [ChecklistStatus.EM_VALIDACAO]: 'bg-blue-100 text-blue-800',
      [ChecklistStatus.VALIDADO]: 'bg-indigo-100 text-indigo-800',
      [ChecklistStatus.APROVADO]: 'bg-emerald-100 text-emerald-800',
      [ChecklistStatus.REPROVADO]: 'bg-red-100 text-red-800',
      [ChecklistStatus.ARQUIVADO]: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  getProgressoValidacao(checklist: Checklist): number {
    const total = checklist.itens.length;
    if (total === 0) return 0;
    const validados = checklist.itens.filter(item => item.validado).length;
    return Math.round((validados / total) * 100);
  }
}
