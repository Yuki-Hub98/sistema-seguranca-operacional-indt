import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaquinasService } from '../../services/maquinas.service';
import { Maquina } from '../../../../models/maquina.model';

@Component({
  selector: 'app-form-modal-cria-maquina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-modal-cria-maquina.html',
})


export class FormModalCriaMaquinaComponent {

  @Output() fechar = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private maquinasService: MaquinasService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      codigo: ['', Validators.required],
      tipo: ['', Validators.required],
      status: ['OPERACIONAL', Validators.required]
    });
  }

  salvar() {
    if (this.form.invalid) return;

    const novaMaquina: Maquina = {
      id: Date.now(), // mock de ID
      ...this.form.value
    };

    this.maquinasService.adicionar(novaMaquina);
    this.fechar.emit();
  }
}