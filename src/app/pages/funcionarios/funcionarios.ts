import { Component, inject, Input } from '@angular/core';
import { faMagnifyingGlass, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../core/services/user-service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../core/services/auth';
import { UserRole } from '../../models/user';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalFuncionario } from "../../core/components/modal-funcionario/modal-funcionario";

@Component({
  selector: 'app-funcionarios',
  imports: [FaIconComponent, FormsModule, ModalFuncionario],
  templateUrl: './funcionarios.html',
  styleUrl: './funcionarios.css',
})
export class Funcionarios {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrashCan = faTrashCan;
  readonly admin = UserRole.ADMIN;

  showModal: boolean = false;

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  searchText = '';
  currentUser = this.authService.currentUser;
  users = this.userService.getUsers();

  doDelete(id: number) {
    this.userService.deleteUser(id);
    this.users = this.userService.getUsers();
  }

  doBuscar() {
    this.users = this.userService.searchUsers(this.searchText);
  }

  openModal() {
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
  }
}
