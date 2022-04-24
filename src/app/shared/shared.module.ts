import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

const MaterialModules = [MatToolbarModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MaterialModules],
  exports: [...MaterialModules],
})
export class SharedModule {}
