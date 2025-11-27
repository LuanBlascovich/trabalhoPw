import { Routes } from '@angular/router';

import { AulasComponent } from './pages/aulas/aulas.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { HistoricoAgendamentoComponent } from './pages/historico-agendamentos/historico-agendamentos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { CompraConfirmacaoComponent } from './pages/compra-confirmacao/compra-confirmacao.component';

/*import { AgendamentosComponent } from './pages/administrador/agendamentos/agendamentos.component';*/
import { InicioComponent } from './pages/administrador/inicio/inicio.component';
import { ListarClientesComponent } from './pages/administrador/listar-clientes/listar-clientes.component';
import { ListarProdutosComponent } from './pages/administrador/listar-produtos/listar-produtos.component';
import { CadastrarProdutoComponent } from './pages/administrador/cadastrar-produto/cadastrar-produto.component';
import { ListarPedidosComponent } from './pages/administrador/listar-pedidos/listar-pedidos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
 /* { path: 'admin/agendamentos', component: AgendamentosComponent },*/
  { path: 'admin', component: InicioComponent },
  { path: 'admin/clientes', component: ListarClientesComponent },
  { path: 'admin/produtos', component: ListarProdutosComponent },
  { path: 'admin/pedidos', component: ListarPedidosComponent },
  { path: 'admin/cadastrar-produto', component: CadastrarProdutoComponent },
  { path: 'admin/cadastrar-produto/:id', component: CadastrarProdutoComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'aulas', component: AulasComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'historico-agendamentos', component: HistoricoAgendamentoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'compra-confirmacao', component: CompraConfirmacaoComponent },
  { path: '**', redirectTo: 'home' },
];
