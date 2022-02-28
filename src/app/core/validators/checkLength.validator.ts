import { AbstractControl, ValidatorFn } from '@angular/forms';

export function checkLength(min: number, max: number): ValidatorFn {
  return (control: AbstractControl) => {
    let valueOf = control.value;

    if (valueOf == null) return null;
    if (valueOf.length < min || valueOf.length > max)
      return {
        errorFieldLength: `Le champ doit avoir entre ${min} et ${max} caractères`,
      };

    return null;
  };
}
