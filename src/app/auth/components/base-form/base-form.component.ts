import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
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
import { Store } from '@ngrx/store';
import { selectError } from '../../../state/selectors/user.selectors';
import { clearError } from '../../../state/actions/user.actions';
import { translateText } from 'src/app/core/helpers/translate.function';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class BaseFormComponent extends AuthDirective implements OnInit {
  errorMessage$ = this.store.select(selectError);

  constructor(
    protected readonly translate: TranslateService,
    private readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    protected readonly store: Store,
    
  ) {
    super();
  }

  @Input() userData!: UserDB;

  ngOnInit(): void {
    this.store.dispatch(clearError());
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

  isValidForm() {
    this.authService.isValidForm = this.formGroup?.valid;
  }

  getIsValidForm() {
    return this.authService.isValidForm;
  }

  validateFirstChar(control: AbstractControl) {
    return isNaN(parseInt(control.value[0])) ? null 
    : { firstdigit: translateText('BASE_FORM.valuenotvalid', this.translate) };
  }

  validateSpecChars(control: AbstractControl) {
    return /[!@#$%^&*]/g.test(control.value) 
      ? { specChar: translateText('BASE_FORM.valuenotvalid', this.translate) } : null;
  }

  validatePasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const enteredPassword = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (enteredPassword !== confirmPassword) {
        const transl = translateText('BASE_FORM.passwordmismatch', this.translate);
        control.get('confirmPassword')?.setErrors({ validatePasswords: transl });
        return { validatePasswords: transl };
      } else {
        control.get('confirmPassword')?.setErrors(null);
      }

      return null;
    };
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
