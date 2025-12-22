import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormFuncionario } from '../form-funcionario/form-funcionario';
import { initialUserData, User } from '../../../models/user';

@Component({
  selector: 'app-modal-funcionario',
  imports: [FormFuncionario],
  templateUrl: './modal-funcionario.html',
  styleUrl: './modal-funcionario.css',
})
export class ModalFuncionario {
  @Input() isEditMode: boolean = false;
  @Input() selectedUser = initialUserData;
  @Output() onSave = new EventEmitter<Partial<User>>();
  @Output() onCancel = new EventEmitter<void>();

  onSaveSubmit(userData: Partial<User>) {
    this.onSave.emit(userData);
  }

  onCancelSubmit() {
    this.onCancel.emit();
  }
}
