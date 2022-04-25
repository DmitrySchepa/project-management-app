import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

const MaterialModules = [MatToolbarModule, MatIconModule, MatRadioModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MaterialModules],
  exports: [...MaterialModules],
})
export class SharedModule {}
