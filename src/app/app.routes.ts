import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Funcionarios } from './pages/funcionarios/funcionarios';
import { Perfil } from './pages/perfil/perfil';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'funcionarios', component: Funcionarios },
  { path: 'perfil', component: Perfil },
];
