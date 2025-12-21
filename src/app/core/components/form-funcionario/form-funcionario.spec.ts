import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFuncionario } from './form-funcionario';

describe('FormFuncionario', () => {
  let component: FormFuncionario;
  let fixture: ComponentFixture<FormFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFuncionario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
