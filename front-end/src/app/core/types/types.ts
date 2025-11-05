export interface Usuario {
  id_usuario?: number;
  nome: string;
  sobrenome?: string;
  email: string;
  senha: string;
  tipo?: 'administrador' | 'instrutor' | 'cliente';
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
  id: number;
  nome: string;
  preco: number;
  imagem?: string;
  cor?: string;         
  quantidade?: number;  
}

export interface Pedido {
  codigo: string;
  data: Date;
  total: number;
  pagamento: string;
}
