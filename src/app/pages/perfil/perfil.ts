import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { UserService } from '../../core/services/user-service';
import { FormFuncionario } from '../../core/components/form-funcionario/form-funcionario';
import { User } from '../../models/user';

@Component({
  selector: 'app-perfil',
  imports: [FormFuncionario],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  currentUser = this.authService.currentUser();

  onPerfilUpdate(updatedData: Partial<User>) {
    const updatedUser = { ...this.currentUser!, ...updatedData };
    this.userService.updateUser(updatedUser);
    this.authService.setCurrentUser(updatedUser);
  }

  reloadPerfil() {
    this.currentUser = { ...this.authService.currentUser()! };
  }
}
