import { Component, inject } from '@angular/core';
import { faMagnifyingGlass, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../core/services/user-service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-funcionarios',
  imports: [FaIconComponent],
  templateUrl: './funcionarios.html',
  styleUrl: './funcionarios.css',
})
export class Funcionarios {
  readonly faPlus = faPlus;
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faPenToSquare = faPenToSquare;
  readonly faTrashCan = faTrashCan;

  private userService = inject(UserService);

  users = this.userService.getUsers();
}
