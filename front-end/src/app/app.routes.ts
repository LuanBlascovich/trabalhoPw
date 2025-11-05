import { Routes } from '@angular/router';

import { AdmComponent } from './pages/adm/adm.component';
import { AulasComponent } from './pages/aulas/aulas.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ConfirmacaoComponent } from './pages/confirmacao/confirmacao.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { CadastrarProdutoComponent } from './pages/cadastrar-produto/cadastrar-produto.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'adm', component: AdmComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'aulas', component: AulasComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'confirmacao', component: ConfirmacaoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'cadastro-produto', component: CadastrarProdutoComponent },
  {
    path: '**',
    redirectTo: 'adm', // 🔹 volta a redirecionar para a página do ADM
  },
];
