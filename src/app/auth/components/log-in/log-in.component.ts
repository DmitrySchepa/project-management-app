import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthDirective } from '../../directives/auth.directive';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class LogInComponent extends AuthDirective implements OnInit {
  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.formGroup.invalid) return;
    this.authService.login(this.formGroup.value);
  }

  getErrorMessage() {
    return this.authService.errorMessage;
  }
}
