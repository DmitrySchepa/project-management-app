import { Component, OnInit } from '@angular/core';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class EditProfileComponent extends SignUpComponent implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    // TODO: get userData and insert in form fields
  }

  override submit() {
    if (this.formGroup.invalid) return;
    this.authService.updateUser({
      name: this.name?.value,
      login: this.login?.value,
      password: this.password?.value,
    });
  }
}
