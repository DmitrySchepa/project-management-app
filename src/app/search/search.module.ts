import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TaskComponent } from './components/task/task.component';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    TaskComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SearchModule { }
