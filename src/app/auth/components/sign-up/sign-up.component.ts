import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthDirective } from '../../directives/auth.directive';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../formStyles.scss'],
})
export class SignUpComponent extends AuthDirective implements OnInit {
  constructor(private readonly fb: FormBuilder, protected readonly authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [this.validatePasswords()],
      },
    );
  }

  validatePasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const enteredPassword = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (enteredPassword !== confirmPassword) {
        control.get('confirmPassword')?.setErrors({ validatePasswords: 'Passwords are mistmatch' });
        return { validatePasswords: 'Passwords are mistmatch' };
      } else {
        control.get('confirmPassword')?.setErrors(null);
      }

      return null;
    };
  }

  submit() {
    if (this.formGroup.invalid) return;
    this.authService.signup({
      name: this.name?.value,
      login: this.email?.value,
      password: this.password?.value,
    });
  }
}
