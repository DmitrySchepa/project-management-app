import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const MaterialModules = [MatToolbarModule, MatIconModule, MatRadioModule, MatButtonToggleModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MaterialModules],
  exports: [...MaterialModules],
})
export class SharedModule {}
