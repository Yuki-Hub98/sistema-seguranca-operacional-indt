import { Injectable, signal } from '@angular/core';
import { Checklist, ChecklistStatus, ChecklistItem, ChecklistValidacao, ChecklistAprovacao } from '../../../models/checklist.model';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  private checklists = signal<Checklist[]>([
    // 1. Checklist Ativo
    {
      id: 1,
      titulo: 'Checklist Diário - Torno CNC',
      descricao: 'Verificação de segurança e operacional do torno CNC antes do início da operação',
      maquinaId: 1,
      maquinaNome: 'Torno CNC XYZ-1000',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-12-01'),
      status: ChecklistStatus.ATIVO,
      itens: [
        { id: 1, descricao: 'Verificar nível de óleo lubrificante', ordem: 1, criticidade: 'ALTA' },
        { id: 2, descricao: 'Testar botão de emergência', ordem: 2, criticidade: 'CRITICA' },
        { id: 3, descricao: 'Verificar proteções e portas de segurança', ordem: 3, criticidade: 'CRITICA' },
        { id: 4, descricao: 'Limpar área de trabalho', ordem: 4, criticidade: 'MEDIA' },
        { id: 5, descricao: 'Verificar estado das ferramentas de corte', ordem: 5, criticidade: 'ALTA' }
      ],
      validacoes: []
    },
    // 2. Checklist Validado (aguardando aprovação)
    {
      id: 2,
      titulo: 'Checklist Semanal - Fresadora',
      descricao: 'Inspeção semanal completa da fresadora',
      maquinaId: 2,
      maquinaNome: 'Fresadora ABC-500',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-12-05'),
      status: ChecklistStatus.VALIDADO,
      itens: [
        { id: 6, descricao: 'Verificar alinhamento dos eixos', ordem: 1, criticidade: 'ALTA', validado: true },
        { id: 7, descricao: 'Lubrificar guias lineares', ordem: 2, criticidade: 'MEDIA', validado: true },
        { id: 8, descricao: 'Calibrar sensores de posição', ordem: 3, criticidade: 'ALTA', validado: true }
      ],
      validacoes: [{
        id: 1,
        checklistId: 2,
        validadoPor: 2,
        validadoPorNome: 'João Operador',
        dataValidacao: new Date('2025-12-20'),
        itensValidados: [
          { itemId: 6, validado: true },
          { itemId: 7, validado: true },
          { itemId: 8, validado: true, observacao: 'Sensor esquerdo reajustado' }
        ],
        observacaoGeral: 'Todos os itens verificados com sucesso'
      }]
    },
    // 3. Checklist Aprovado
    {
      id: 3,
      titulo: 'Checklist Mensal - Prensa Hidráulica',
      descricao: 'Manutenção preventiva mensal da prensa hidráulica',
      maquinaId: 3,
      maquinaNome: 'Prensa Hidráulica PH-2000',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-11-15'),
      status: ChecklistStatus.APROVADO,
      itens: [
        { id: 9, descricao: 'Verificar pressão do sistema hidráulico', ordem: 1, criticidade: 'CRITICA', validado: true },
        { id: 10, descricao: 'Inspecionar mangueiras e conexões', ordem: 2, criticidade: 'ALTA', validado: true },
        { id: 11, descricao: 'Testar válvulas de segurança', ordem: 3, criticidade: 'CRITICA', validado: true },
        { id: 12, descricao: 'Verificar nível de óleo hidráulico', ordem: 4, criticidade: 'ALTA', validado: true }
      ],
      validacoes: [{
        id: 2,
        checklistId: 3,
        validadoPor: 2,
        validadoPorNome: 'João Operador',
        dataValidacao: new Date('2025-12-15'),
        itensValidados: [
          { itemId: 9, validado: true },
          { itemId: 10, validado: true },
          { itemId: 11, validado: true },
          { itemId: 12, validado: true }
        ],
        observacaoGeral: 'Sistema hidráulico operando perfeitamente'
      }],
      aprovacao: {
        id: 1,
        checklistId: 3,
        aprovadoPor: 3,
        aprovadoPorNome: 'Carlos Supervisor',
        dataAprovacao: new Date('2025-12-16'),
        aprovado: true,
        motivo: '',
        observacoes: 'Manutenção realizada conforme procedimento'
      }
    },
    // 4. Checklist Reprovado
    {
      id: 4,
      titulo: 'Checklist Diário - Empilhadeira',
      descricao: 'Verificação pré-operacional da empilhadeira',
      maquinaId: 4,
      maquinaNome: 'Empilhadeira EMP-007',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-12-18'),
      status: ChecklistStatus.REPROVADO,
      itens: [
        { id: 13, descricao: 'Verificar nível de combustível', ordem: 1, criticidade: 'MEDIA', validado: true },
        { id: 14, descricao: 'Testar freios', ordem: 2, criticidade: 'CRITICA', validado: false, observacao: 'Freio traseiro com resposta lenta' },
        { id: 15, descricao: 'Verificar pneus e pressão', ordem: 3, criticidade: 'ALTA', validado: true },
        { id: 16, descricao: 'Testar buzina e sinalizadores', ordem: 4, criticidade: 'ALTA', validado: true }
      ],
      validacoes: [{
        id: 3,
        checklistId: 4,
        validadoPor: 2,
        validadoPorNome: 'João Operador',
        dataValidacao: new Date('2025-12-19'),
        itensValidados: [
          { itemId: 13, validado: true },
          { itemId: 14, validado: false, observacao: 'Freio traseiro com resposta lenta' },
          { itemId: 15, validado: true },
          { itemId: 16, validado: true }
        ],
        observacaoGeral: 'Problema identificado no sistema de freios'
      }],
      aprovacao: {
        id: 2,
        checklistId: 4,
        aprovadoPor: 3,
        aprovadoPorNome: 'Carlos Supervisor',
        dataAprovacao: new Date('2025-12-19'),
        aprovado: false,
        motivo: 'Sistema de freios precisa de manutenção imediata antes de liberar o equipamento',
        observacoes: 'Equipamento bloqueado até correção do problema'
      }
    },
    // 5. Checklist Em Validação
    {
      id: 5,
      titulo: 'Checklist Diário - Ponte Rolante',
      descricao: 'Inspeção diária de segurança da ponte rolante',
      maquinaId: 5,
      maquinaNome: 'Ponte Rolante PR-10T',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-12-20'),
      status: ChecklistStatus.EM_VALIDACAO,
      itens: [
        { id: 17, descricao: 'Verificar cabo de aço', ordem: 1, criticidade: 'CRITICA', validado: true },
        { id: 18, descricao: 'Testar botão de emergência', ordem: 2, criticidade: 'CRITICA', validado: true },
        { id: 19, descricao: 'Verificar gancho e trava de segurança', ordem: 3, criticidade: 'CRITICA', validado: false },
        { id: 20, descricao: 'Testar movimentos (subida/descida)', ordem: 4, criticidade: 'ALTA' }
      ],
      validacoes: []
    },
    // 6. Checklist Ativo - Compressor
    {
      id: 6,
      titulo: 'Checklist Semanal - Compressor de Ar',
      descricao: 'Verificação semanal do sistema de ar comprimido',
      maquinaId: 6,
      maquinaNome: 'Compressor Atlas Copco GA-55',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-12-19'),
      status: ChecklistStatus.ATIVO,
      itens: [
        { id: 21, descricao: 'Drenar condensado dos reservatórios', ordem: 1, criticidade: 'MEDIA' },
        { id: 22, descricao: 'Verificar nível de óleo do compressor', ordem: 2, criticidade: 'ALTA' },
        { id: 23, descricao: 'Inspecionar filtros de ar', ordem: 3, criticidade: 'MEDIA' },
        { id: 24, descricao: 'Verificar vazamentos no sistema', ordem: 4, criticidade: 'ALTA' },
        { id: 25, descricao: 'Testar válvula de segurança', ordem: 5, criticidade: 'CRITICA' }
      ],
      validacoes: []
    },
    // 7. Checklist Validado - Solda
    {
      id: 7,
      titulo: 'Checklist Diário - Estação de Solda',
      descricao: 'Verificação de equipamentos de solda e EPIs',
      maquinaId: 7,
      maquinaNome: 'Estação de Solda MIG/MAG',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-12-18'),
      status: ChecklistStatus.VALIDADO,
      itens: [
        { id: 26, descricao: 'Verificar cabos e conexões elétricas', ordem: 1, criticidade: 'ALTA', validado: true },
        { id: 27, descricao: 'Inspecionar tocha de solda', ordem: 2, criticidade: 'ALTA', validado: true },
        { id: 28, descricao: 'Verificar cilindro de gás e regulador', ordem: 3, criticidade: 'CRITICA', validado: true },
        { id: 29, descricao: 'Testar sistema de exaustão', ordem: 4, criticidade: 'ALTA', validado: true },
        { id: 30, descricao: 'Verificar EPIs (máscara, luvas, avental)', ordem: 5, criticidade: 'CRITICA', validado: true }
      ],
      validacoes: [{
        id: 4,
        checklistId: 7,
        validadoPor: 4,
        validadoPorNome: 'Maria Santos',
        dataValidacao: new Date('2025-12-20'),
        itensValidados: [
          { itemId: 26, validado: true },
          { itemId: 27, validado: true },
          { itemId: 28, validado: true },
          { itemId: 29, validado: true },
          { itemId: 30, validado: true }
        ],
        observacaoGeral: 'Todos os equipamentos em perfeito estado'
      }]
    },
    // 8. Checklist Ativo - Serra
    {
      id: 8,
      titulo: 'Checklist Diário - Serra Fita',
      descricao: 'Inspeção de segurança da serra fita',
      maquinaId: 8,
      maquinaNome: 'Serra Fita SF-400',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date(Date.now()),
      status: ChecklistStatus.ATIVO,
      itens: [
        { id: 31, descricao: 'Verificar tensão da lâmina', ordem: 1, criticidade: 'ALTA' },
        { id: 32, descricao: 'Inspecionar estado dos dentes da lâmina', ordem: 2, criticidade: 'ALTA' },
        { id: 33, descricao: 'Testar proteção da lâmina', ordem: 3, criticidade: 'CRITICA' },
        { id: 34, descricao: 'Verificar sistema de refrigeração', ordem: 4, criticidade: 'MEDIA' },
        { id: 35, descricao: 'Limpar resíduos e cavacos', ordem: 5, criticidade: 'BAIXA' }
      ],
      validacoes: []
    },
    // 9. Checklist Aprovado - Injetora
    {
      id: 9,
      titulo: 'Checklist Mensal - Injetora de Plástico',
      descricao: 'Manutenção preventiva mensal da injetora',
      maquinaId: 9,
      maquinaNome: 'Injetora Haitian MA-900',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-11-20'),
      status: ChecklistStatus.APROVADO,
      itens: [
        { id: 36, descricao: 'Verificar sistema hidráulico', ordem: 1, criticidade: 'CRITICA', validado: true },
        { id: 37, descricao: 'Inspecionar resistências de aquecimento', ordem: 2, criticidade: 'ALTA', validado: true },
        { id: 38, descricao: 'Calibrar pressões de injeção', ordem: 3, criticidade: 'ALTA', validado: true },
        { id: 39, descricao: 'Verificar sistema de refrigeração', ordem: 4, criticidade: 'ALTA', validado: true },
        { id: 40, descricao: 'Lubrificar pontos de articulação', ordem: 5, criticidade: 'MEDIA', validado: true }
      ],
      validacoes: [{
        id: 5,
        checklistId: 9,
        validadoPor: 2,
        validadoPorNome: 'João Operador',
        dataValidacao: new Date('2025-12-10'),
        itensValidados: [
          { itemId: 36, validado: true },
          { itemId: 37, validado: true },
          { itemId: 38, validado: true },
          { itemId: 39, validado: true },
          { itemId: 40, validado: true }
        ],
        observacaoGeral: 'Máquina operando dentro dos parâmetros'
      }],
      aprovacao: {
        id: 3,
        checklistId: 9,
        aprovadoPor: 3,
        aprovadoPorNome: 'Carlos Supervisor',
        dataAprovacao: new Date('2025-12-11'),
        aprovado: true,
        motivo: '',
        observacoes: 'Manutenção preventiva concluída com sucesso'
      }
    },
    // 10. Checklist Validado - Furadeira
    {
      id: 10,
      titulo: 'Checklist Semanal - Furadeira de Bancada',
      descricao: 'Verificação semanal de segurança',
      maquinaId: 10,
      maquinaNome: 'Furadeira de Bancada FB-16',
      criadoPor: 1,
      criadoPorNome: 'Admin Silva',
      dataCriacao: new Date('2025-12-17'),
      status: ChecklistStatus.VALIDADO,
      itens: [
        { id: 41, descricao: 'Verificar fixação da morsa', ordem: 1, criticidade: 'ALTA', validado: true },
        { id: 42, descricao: 'Inspecionar estado das brocas', ordem: 2, criticidade: 'MEDIA', validado: true },
        { id: 43, descricao: 'Testar proteção móvel', ordem: 3, criticidade: 'CRITICA', validado: true, observacao: 'Proteção ajustada e funcionando' },
        { id: 44, descricao: 'Verificar chave de emergência', ordem: 4, criticidade: 'CRITICA', validado: true },
        { id: 45, descricao: 'Limpar mesa de trabalho', ordem: 5, criticidade: 'BAIXA', validado: true }
      ],
      validacoes: [{
        id: 6,
        checklistId: 10,
        validadoPor: 4,
        validadoPorNome: 'Maria Santos',
        dataValidacao: new Date('2025-12-20'),
        itensValidados: [
          { itemId: 41, validado: true },
          { itemId: 42, validado: true },
          { itemId: 43, validado: true, observacao: 'Proteção ajustada e funcionando' },
          { itemId: 44, validado: true },
          { itemId: 45, validado: true }
        ],
        observacaoGeral: 'Equipamento em condições normais de operação'
      }]
    }
  ]);

  private nextId = signal(11);

  getChecklists() {
    return this.checklists();
  }

  getChecklistById(id: number): Checklist | undefined {
    return this.checklists().find(c => c.id === id);
  }

  getChecklistsByStatus(status: ChecklistStatus): Checklist[] {
    return this.checklists().filter(c => c.status === status);
  }

  getChecklistsByMaquina(maquinaId: number): Checklist[] {
    return this.checklists().filter(c => c.maquinaId === maquinaId);
  }

  criarChecklist(checklist: Omit<Checklist, 'id' | 'dataCriacao' | 'validacoes'>): Checklist {
    const newChecklist: Checklist = {
      ...checklist,
      id: this.nextId(),
      dataCriacao: new Date(),
      validacoes: []
    };
    
    this.checklists.update(checklists => [...checklists, newChecklist]);
    this.nextId.update(id => id + 1);
    
    return newChecklist;
  }

  atualizarChecklist(id: number, updates: Partial<Checklist>): boolean {
    const index = this.checklists().findIndex(c => c.id === id);
    if (index === -1) return false;

    this.checklists.update(checklists => {
      const updated = [...checklists];
      updated[index] = { ...updated[index], ...updates };
      return updated;
    });

    return true;
  }

  deletarChecklist(id: number): boolean {
    const index = this.checklists().findIndex(c => c.id === id);
    if (index === -1) return false;

    this.checklists.update(checklists => checklists.filter(c => c.id !== id));
    return true;
  }

  validarChecklist(
    checklistId: number,
    validadoPor: number,
    validadoPorNome: string,
    itensValidados: { itemId: number; validado: boolean; observacao?: string }[],
    observacaoGeral?: string
  ): boolean {
    const checklist = this.getChecklistById(checklistId);
    if (!checklist) return false;

    const validacao: ChecklistValidacao = {
      id: Date.now(),
      checklistId,
      validadoPor,
      validadoPorNome,
      dataValidacao: new Date(),
      itensValidados,
      observacaoGeral
    };

    // Atualizar os itens do checklist com os status de validação
    const itensAtualizados = checklist.itens.map(item => {
      const validacaoItem = itensValidados.find(v => v.itemId === item.id);
      if (validacaoItem) {
        return {
          ...item,
          validado: validacaoItem.validado,
          observacao: validacaoItem.observacao
        };
      }
      return item;
    });

    this.atualizarChecklist(checklistId, {
      itens: itensAtualizados,
      validacoes: [...(checklist.validacoes || []), validacao],
      status: ChecklistStatus.VALIDADO
    });

    return true;
  }

  aprovarChecklist(
    checklistId: number,
    aprovadoPor: number,
    aprovadoPorNome: string,
    aprovado: boolean,
    motivo: string,
    observacoes?: string
  ): boolean {
    const checklist = this.getChecklistById(checklistId);
    if (!checklist || checklist.status !== ChecklistStatus.VALIDADO) return false;

    const aprovacao: ChecklistAprovacao = {
      id: Date.now(),
      checklistId,
      aprovadoPor,
      aprovadoPorNome,
      dataAprovacao: new Date(),
      aprovado,
      motivo,
      observacoes
    };

    this.atualizarChecklist(checklistId, {
      aprovacao,
      status: aprovado ? ChecklistStatus.APROVADO : ChecklistStatus.REPROVADO
    });

    return true;
  }

  adicionarItem(checklistId: number, item: Omit<ChecklistItem, 'id'>): boolean {
    const checklist = this.getChecklistById(checklistId);
    if (!checklist) return false;

    const newItem: ChecklistItem = {
      ...item,
      id: Date.now()
    };

    this.atualizarChecklist(checklistId, {
      itens: [...checklist.itens, newItem]
    });

    return true;
  }

  removerItem(checklistId: number, itemId: number): boolean {
    const checklist = this.getChecklistById(checklistId);
    if (!checklist) return false;

    this.atualizarChecklist(checklistId, {
      itens: checklist.itens.filter(item => item.id !== itemId)
    });

    return true;
  }
}
