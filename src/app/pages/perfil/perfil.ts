import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faUser, faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserFormGroup, UserRole } from '../../models/user';
import { senhaIgualValidator } from '../../core/validators/senha-igual-validator';

@Component({
  selector: 'app-perfil',
  imports: [FaIconComponent, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  readonly faUser = faUser;
  readonly faEnvelope = faEnvelope;
  readonly faLock = faLock;
  readonly faIdBadge = faIdBadge;
  readonly rolesOptions = Object.values(UserRole);
  readonly adminRole = UserRole.ADMIN;

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  currentUser = this.authService.currentUser();

  userForm = this.formBuilder.group<UserFormGroup>(
    {
      username: new FormControl(this.currentUser?.username, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.currentUser?.email, [Validators.email]),
      newPassword: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl(''),
      firstName: new FormControl(this.currentUser?.firstName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(this.currentUser?.lastName, [Validators.minLength(2)]),
      roles: new FormControl(this.currentUser?.roles, Validators.required),
      isActive: new FormControl(this.currentUser?.isActive, Validators.required),
    },
    { validators: [senhaIgualValidator('newPassword', 'confirmPassword')] }
  );

  onSubmit() {
      console.log('Form submitted:', this.userForm.value);
  }
}
