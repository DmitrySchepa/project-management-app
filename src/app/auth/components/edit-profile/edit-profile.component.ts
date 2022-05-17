import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { BaseFormComponent } from '../base-form/base-form.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../state/selectors/user.selectors';
import { translateText } from 'src/app/core/helpers/translate.function';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class EditProfileComponent extends BaseFormComponent implements OnInit {
  public userData$ = this.store.select(selectUser);

  constructor(
    translate: TranslateService,
    fb: FormBuilder, 
    authService: AuthService, 
    store: Store, 
    private dialog: MatDialog
    ) {
    super(translate, fb, authService, store);
  }

  override submit() {
    super.submit();
    this.authService.updateUser(this.authService.userData);
  }

  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: translateText('EDITPROFILE.wantdeleteuser', this.translate),
        buttonText: {
          ok: translateText('EDITPROFILE.okbtntext', this.translate),
          cancel: translateText('EDITPROFILE.cancelbtntext', this.translate),
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.authService.deleteUser();
      }
    });
  }
}
