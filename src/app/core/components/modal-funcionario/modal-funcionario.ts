import { Component, Input } from '@angular/core';
import { FormFuncionario } from '../form-funcionario/form-funcionario';
import { initialUserData } from '../../../models/user';

@Component({
  selector: 'app-modal-funcionario',
  imports: [FormFuncionario],
  templateUrl: './modal-funcionario.html',
  styleUrl: './modal-funcionario.css',
})
export class ModalFuncionario {
  @Input() isEditMode: boolean = false;
  @Input() selectedUser = initialUserData;
}
