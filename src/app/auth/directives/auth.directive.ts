import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  public hide = true;

  public hideConfirm = true;

  public formGroup!: FormGroup;

  get name() {
    return this.formGroup.get('name');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }
}
