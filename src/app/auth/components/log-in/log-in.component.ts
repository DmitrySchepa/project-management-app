import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthDirective } from '../../directives/auth.directive';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss', '../formStyles.scss'],
})
export class LogInComponent extends AuthDirective implements OnInit {
  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.formGroup.invalid) return;
    console.log('log');
    this.authService.login(this.formGroup.value);
  }
}
