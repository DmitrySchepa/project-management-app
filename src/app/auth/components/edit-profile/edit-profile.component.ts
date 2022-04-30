import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class EditProfileComponent extends BaseFormComponent implements OnInit {
  public userData$ = this.authService.getUser();

  override submit() {
    super.submit();
    this.authService.updateUser(this.authService.userData);
  }

  deleteUser() {
    this.authService.deleteUser();
  }
}
