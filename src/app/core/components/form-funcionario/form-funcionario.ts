import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { faEnvelope, faUser, faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { User, UserFormGroup, UserRole } from '../../../models/user';
import { senhaIgualValidator } from '../../validators/senha-igual-validator';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-form-funcionario',
  imports: [FaIconComponent, ReactiveFormsModule],
  templateUrl: './form-funcionario.html',
  styleUrl: './form-funcionario.css',
})
export class FormFuncionario {
  readonly faUser = faUser;
  readonly faEnvelope = faEnvelope;
  readonly faLock = faLock;
  readonly faIdBadge = faIdBadge;
  readonly rolesOptions = Object.values(UserRole);
  readonly adminRole = UserRole.ADMIN;

  private formBuilder = inject(FormBuilder);

  @Input() formTitle!: string;
  @Input() formDescription!: string;
  @Input() canChangeStatus!: boolean;
  @Input() selectedUser!: User | null;

  ngOnInit(): void {
    if (this.selectedUser?.roles !== this.adminRole) {
      this.userForm.get('roles')?.disable();
    }
  }

  userForm = this.formBuilder.group<UserFormGroup>(
    {
      username: new FormControl(this.selectedUser?.username, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.selectedUser?.email, [Validators.email]),
      newPassword: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl(''),
      firstName: new FormControl(this.selectedUser?.firstName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(this.selectedUser?.lastName, [Validators.minLength(2)]),
      roles: new FormControl(this.selectedUser?.roles, Validators.required),
      isActive: new FormControl(this.selectedUser?.isActive, Validators.required),
    },
    { validators: [senhaIgualValidator('newPassword', 'confirmPassword')] }
  );

  onSubmit() {
    console.log(this.userForm.value);
  }
}
