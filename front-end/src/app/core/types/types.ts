export interface Usuario {
  id_usuario?: number;
  nome: string;
  sobrenome?: string;
  email: string;
  senha: string;
  tipo?: 'administrador' | 'instrutor' | 'cliente';
  data_criacao?: string;
}
