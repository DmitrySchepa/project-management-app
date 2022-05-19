import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PomodoroComponent } from './pomodoro.component';
import { TimerComponent } from './components/timer/timer.component';
import { PomodoroItemComponent } from './components/pomodoro-item/pomodoro-item.component';
import { PomodoroListComponent } from './components/pomodoro-list/pomodoro-list.component';
import { PomodoroEditComponent } from './components/pomodoro-edit/pomodoro-edit.component';
import { CreatePomodoroComponent } from './components/create-pomodoro/create-pomodoro.component';



@NgModule({
  declarations: [
    PomodoroComponent,
    TimerComponent,
    PomodoroItemComponent,
    PomodoroListComponent,
    PomodoroEditComponent,
    CreatePomodoroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class PomodoroModule { }
