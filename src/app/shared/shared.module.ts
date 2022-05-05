import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from '../core/interceptors/api.interceptor';
import { MatTooltipModule } from '@angular/material/tooltip';

const MaterialModules = [
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  DragDropModule,
  MatCardModule,
  MatTabsModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MaterialModules],
  exports: [...MaterialModules],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
})
export class SharedModule {}
