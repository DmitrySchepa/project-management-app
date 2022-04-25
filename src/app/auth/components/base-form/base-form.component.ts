import { Component } from '@angular/core';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss', '../formStyles.scss'],
})
export class BaseFormComponent extends SignUpComponent {}
