import { Routes } from '@angular/router';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { ConfirmacaoComponent } from './pages/confirmacao/confirmacao.component';

export const routes: Routes = [
  { path: '', redirectTo: '/agendamento', pathMatch: 'full' },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'confirmacao', component: ConfirmacaoComponent },
  { path: 'home', component: AgendamentoComponent },
  { path: 'aula', component: AgendamentoComponent },
  { path: 'produtos', component: AgendamentoComponent },
  { path: 'sobre', component: AgendamentoComponent },
];
