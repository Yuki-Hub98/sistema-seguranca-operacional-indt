import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuncionario } from './modal-funcionario';

describe('ModalFuncionario', () => {
  let component: ModalFuncionario;
  let fixture: ComponentFixture<ModalFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFuncionario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
