import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class FormFuncionario implements OnChanges {
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
  @Output() onSave = new EventEmitter<Partial<User>>();
  @Output() onCancel = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.selectedUser?.roles !== this.adminRole) {
      this.userForm.get('roles')?.disable();
    }
  }

  userForm = this.formBuilder.group<UserFormGroup>(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.email]),
      newPassword: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.minLength(2)]),
      roles: new FormControl(null, Validators.required),
      isActive: new FormControl(false, Validators.required),
    },
    { validators: [senhaIgualValidator('newPassword', 'confirmPassword')] }
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && this.selectedUser) {
      this.userForm.patchValue({
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        username: this.selectedUser.username,
        email: this.selectedUser.email,
        roles: this.selectedUser.roles,
        isActive: this.selectedUser.isActive,
      });
    }
  }

  onSubmit() {
    const userValues: Partial<User> = {
      firstName: this.userForm.value.firstName!,
      lastName: this.userForm.value.lastName!,
      username: this.userForm.value.username!,
      email: this.userForm.value.email!,
      roles: this.userForm.value.roles!,
      isActive: this.userForm.value.isActive!,
    };

    if (this.userForm.value.newPassword) {
      userValues.password = this.userForm.value.newPassword;
    }

    this.onSave.emit(userValues);
  }

  onCancelSubmit() {
    this.onCancel.emit();
  }
}
