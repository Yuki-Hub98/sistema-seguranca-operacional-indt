import { Component, inject, OnInit } from '@angular/core';
import { faEnvelope, faUser, faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserFormGroup, UserRole } from '../../models/user';
import { senhaIgualValidator } from '../../core/validators/senha-igual-validator';
import { UserService } from '../../core/services/user-service';
import { FormFuncionario } from '../../core/components/form-funcionario/form-funcionario';

@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule, FormFuncionario],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser();
}
