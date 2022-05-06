import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../state/selectors/user.selectors';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../form-styles.scss'],
})
export class EditProfileComponent extends BaseFormComponent implements OnInit {
  public userData$ = this.store.select(selectUser);

  constructor(
    fb: FormBuilder,
    authService: AuthService,
    private dialog: MatDialog,
    private readonly store: Store,
  ) {
    super(fb, authService);
  }

  override submit() {
    super.submit();
    this.authService.updateUser(this.authService.userData);
  }

  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Are you sure want to delete user?`,
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel',
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
