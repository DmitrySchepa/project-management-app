import { Component } from '@angular/core';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class BaseFormComponent extends SignUpComponent {}
