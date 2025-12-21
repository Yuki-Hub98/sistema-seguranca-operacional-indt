export interface Checklist {
  id: number;
  titulo: string;
  descricao: string;
  maquinaId: number;
  maquinaNome?: string;
  criadoPor: number;
  criadoPorNome?: string;
  dataCriacao: Date;
  status: ChecklistStatus;
  itens: ChecklistItem[];
  validacoes?: ChecklistValidacao[];
  aprovacao?: ChecklistAprovacao;
}

export interface ChecklistItem {
  id: number;
  descricao: string;
  ordem: number;
  criticidade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';
  validado?: boolean;
  observacao?: string;
}

export interface ChecklistValidacao {
  id: number;
  checklistId: number;
  validadoPor: number;
  validadoPorNome?: string;
  dataValidacao: Date;
  itensValidados: {
    itemId: number;
    validado: boolean;
    observacao?: string;
  }[];
  observacaoGeral?: string;
}

export interface ChecklistAprovacao {
  id: number;
  checklistId: number;
  aprovadoPor: number;
  aprovadoPorNome?: string;
  dataAprovacao: Date;
  aprovado: boolean;
  motivo: string;
  observacoes?: string;
}

export enum ChecklistStatus {
  RASCUNHO = 'RASCUNHO',
  ATIVO = 'ATIVO',
  EM_VALIDACAO = 'EM_VALIDACAO',
  VALIDADO = 'VALIDADO',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO',
  ARQUIVADO = 'ARQUIVADO'
}
