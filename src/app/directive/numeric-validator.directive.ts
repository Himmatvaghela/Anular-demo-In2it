import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNumericValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumericValidatorDirective),
      multi: true
    }
  ]
})
export class NumericValidatorDirective implements Validator {


  validate(control: AbstractControl): ValidationErrors | null {
    console.log('from directive',control)
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      return { 'numeric': true };
    }
    return null;
  }

}
