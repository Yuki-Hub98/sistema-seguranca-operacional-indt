import { AbstractControl, ValidationErrors } from '@angular/forms';

export function senhaIgualValidator(senha: string, confirmarSenha: string) {
  return (form: AbstractControl): ValidationErrors | null => {
    const senhaControl = form.get(senha);
    const confirmarControl = form.get(confirmarSenha);

    if (!senhaControl || !confirmarControl) return null;

    if (senhaControl.value !== confirmarControl.value) {
      confirmarControl.setErrors({ passwordNotEqual: true });
      return { passwordNotEqual: true };
    }

    if (confirmarControl.hasError('passwordNotEqual')) {
      confirmarControl.setErrors(null);
    }
    return null;
  };
}
