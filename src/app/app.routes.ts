import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';
import { UserRole } from './models/user';
import { roleGuard } from './core/guards/role.guard';
import { Maquinas } from './pages/maquinas/maquinas';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login/login').then(m => m.Login)
      },
    ]
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    canActivateChild: [roleGuard],    /* isso aqui define quem tem acesso as rotas, o perfil que está logado e não está na lista não tem acesso, por exemplo funcionario:
                                        Se admin não estivesse na lista de roles, ia ser redirecionado para '/'.*/
    children: [                     
      {
        path: '',
        data: {
          roles: [UserRole.OPERADOR, UserRole.SUPERVISOR, UserRole.ADMIN]
        },
        loadComponent: () =>
          import('./pages/home/home').then(m => m.Home)
      },
      {
        path: 'funcionarios',
        data: {
          roles: [UserRole.OPERADOR, UserRole.SUPERVISOR, UserRole.ADMIN]
        },
        loadComponent: () =>
          import('./pages/funcionarios/funcionarios').then(m => m.Funcionarios)
      },
      {
        path: 'perfil',
        data: {
          roles: [UserRole.OPERADOR, UserRole.SUPERVISOR, UserRole.ADMIN]
        },
        loadComponent: () =>
          import('./pages/perfil/perfil').then(m => m.Perfil)
      },
      {
        path: 'maquinas',
        data: {
          roles: [UserRole.OPERADOR, UserRole.SUPERVISOR, UserRole.ADMIN]
        },
        loadComponent: () =>
          import('./pages/maquinas/maquinas').then(m => m.Maquinas)
      },
      {
        path: 'checklist',
        data: {
          roles: [UserRole.OPERADOR, UserRole.SUPERVISOR, UserRole.ADMIN]
        },
        loadComponent: () =>
          import('./pages/checklists/checklists').then(m => m.Checklists)
      }
    ]
  }
 
];
