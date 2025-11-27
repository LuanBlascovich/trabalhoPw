export interface Usuario {
  id_usuario?: number;
  nome: string;
  sobrenome?: string;
  email: string;
  senha: string;
  tipo?: 'administrador' | 'cliente';
  data_criacao?: string;
}

export interface Produto {
  id_produto?: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
}

export interface ProdutoCarrinho {
  id_produto: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
  quantidade: number;
}

export interface Pedido {
  id_venda: number;
  cliente_id: number;
  cliente_nome: string;
  total: number;
  data: string;
}

export interface Agendamento {
  id_agendamento: number;
  aula_id: number;
  instrutor_id: number;
  cliente_id: number;
  data_hora: string;
  status_agendamento: string;
  nivel: string;
  total: string;
  metodoPagamento: string;
}

export interface Aula {
  id_aula: number;
  descricao: string;
  nivel: string;
}
