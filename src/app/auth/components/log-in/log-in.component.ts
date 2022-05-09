import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthDirective } from '../../directives/auth.directive';
import { Store } from '@ngrx/store';
import { selectError } from '../../../state/selectors/user.selectors';
import { clearError } from '../../../state/actions/user.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class LogInComponent extends AuthDirective implements OnInit {
  public errorMessage$ = this.store.select(selectError);

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly store: Store,
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(clearError());
    this.formGroup = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.formGroup.invalid) return;
    this.authService.login(this.formGroup.value);
  }
}
