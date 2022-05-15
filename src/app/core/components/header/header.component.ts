import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../auth/services/auth.service';
import { langs } from '../../../constants/langs';
import { Store } from '@ngrx/store';
import { selectToken } from '../../../state/selectors/user.selectors';
import { BoardsService } from 'src/app/boards/services/boards.service';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  enableSticky: boolean = false;

  public hasToken$ = this.store.select(selectToken);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly authService: AuthService,
    private readonly store: Store,
    public translate: TranslateService,
    private readonly boardsService: BoardsService,
    private readonly apiService: ApiService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.boardsService.openDialogEvent.subscribe((type) => this.onBoardDialog(type));
    this.translate.addLangs(langs);
    const storedLang = localStorage.getItem('pma-lang');
    const browserLang = this.translate.getBrowserLang() ?? '';
    const curLang = storedLang ?? browserLang;

    if (curLang && langs.includes(curLang)) {
      this.translate.use(curLang);
    } else {
      this.translate.use('en');
    }

    fromEvent(window, 'scroll').subscribe(() => {
      if (this.document.defaultView!.scrollY > 0) {
        this.enableSticky = true;
      } else {
        this.enableSticky = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  onClickEnglish(): void {
    this.translate.use('en');
    localStorage.setItem('pma-lang', 'en');
  }

  onClickRussian(): void {
    this.translate.use('ru');
    localStorage.setItem('pma-lang', 'ru');
  }

  isChecked(lang: string): boolean {
    return lang === this.translate.currentLang;
  }

  onBoardDialog(type: string) {
    this.apiService.isInfoAddModeOn$.next(true);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: this.boardsService.boardData,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.apiService.isInfoAddModeOn$.next(false);
      if (confirmed) {
        this.boardsService.createBoard(this.boardsService.boardData);
      }
    });
  }
}
