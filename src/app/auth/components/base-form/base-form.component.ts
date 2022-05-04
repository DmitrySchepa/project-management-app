import { Component, Input, OnInit } from '@angular/core';
import { AuthDirective } from '../../directives/auth.directive';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserDB } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class BaseFormComponent extends AuthDirective implements OnInit {
  constructor(private readonly fb: FormBuilder, protected readonly authService: AuthService) {
    super();
  }

  @Input() userData!: UserDB;

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        name: [
          this.userData?.name || '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            this.validateFirstChar,
            this.validateSpecChars,
          ],
        ],
        login: [
          this.userData?.login || '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            this.validateFirstChar,
            this.validateSpecChars,
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [this.validatePasswords()],
      },
    );
  }

  validateFirstChar(control: AbstractControl) {
    return isNaN(parseInt(control.value[0])) ? null : { firstdigit: 'Entered value is not valid' };
  }

  validateSpecChars(control: AbstractControl) {
    return /[!@#$%^&*]/g.test(control.value) ? { specChar: 'Special char is found!' } : null;
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

  getErrorMessage() {
    return this.authService.errorMessage;
  }

  submit() {
    if (this.formGroup.invalid) return;
    this.authService.userData = {
      name: this.name?.value,
      login: this.login?.value,
      password: this.password?.value,
    };
  }
}
