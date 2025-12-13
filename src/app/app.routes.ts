import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Funcionarios } from './pages/funcionarios/funcionarios';
import { Perfil } from './pages/perfil/perfil';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [
      { path: '', component: Login }
    ]
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      { path: 'funcionarios', component: Funcionarios },
      { path: 'perfil', component: Perfil },
    ]
  }
 
];
