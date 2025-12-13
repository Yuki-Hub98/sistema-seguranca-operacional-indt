import { Component, computed, inject, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authService = inject(Auth);
  router = inject(Router);

  isLoading: boolean = false;

  formSubmit = signal<boolean>( false);
  password = signal<string>('');
  username = signal<string>('');

  usernameInvalid = computed(() => {
    return this.username().length === 0;
  });

  passwordInvalid = computed(() => {
    return this.password().length === 0;
  });

  errorMessage  = computed(() => {
    return this.passwordInvalid() || this.usernameInvalid()  ? 'Username and Password are required' : '';
  });

  onSubmit() {
    if (!this.usernameInvalid() && !this.passwordInvalid()) {
        let result = this.authService.autenticate(this.username(), this.password());

        if(result) {
          this.formSubmit.set(true);
          this.router.navigate(['/']);
        }

        this.username.set('');
        this.password.set('');
        this.formSubmit.set(true);

    }
    this.formSubmit.set(true);
  }

}
