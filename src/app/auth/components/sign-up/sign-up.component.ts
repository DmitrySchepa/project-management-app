import { Component, OnInit } from '@angular/core';

import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
  override submit() {
    super.submit();
    this.authService.signup(this.authService.userData);
  }
}
