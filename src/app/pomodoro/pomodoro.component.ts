import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PomodoroService } from './services/pomodoro.service';
import { IPomodoro } from './models/pomodoro.model';
import { CreatePomodoroComponent } from './components/create-pomodoro/create-pomodoro.component';
import { TimerComponent } from './components/timer/timer.component';

const SECONDS_IN_MINUTE = 60;

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent implements OnInit {
  pomodoroes: IPomodoro[] = [];
  pomodoroSubscription!: Subscription;

  constructor(
    private pomodoroService: PomodoroService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const pomodoroes = this.pomodoroService.getAll();
    if(pomodoroes) this.pomodoroes = pomodoroes;
  }

  ngOnDestroy(): void {
    this.pomodoroSubscription.unsubscribe();
  }

  onRemoveAll() {
    this.pomodoroService.removeAll();
  }

  updateList() {
    const pomodoroes = this.pomodoroService.getAll();
    if(pomodoroes) this.pomodoroes = pomodoroes;   
  }

  onNewPomodoro() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const newPom: IPomodoro = {
      id: this.pomodoroService.generateUniqueId(),
      name: '',
      description: '',
      start: '',
      end: '',
      success: false
    };

    dialogConfig.data = {
      name: newPom.name,
      description: newPom.description,
      duration: 25,
      start: newPom.start
    };

    const dialogRef = this.dialog.open(CreatePomodoroComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        newPom.name = result.name;
        newPom.description = result.description;
        const duration = result.duration;
        newPom.start = Date.now().toString();

        const dialogConfigInner = new MatDialogConfig();
        dialogConfigInner.data = {
          duration: duration * SECONDS_IN_MINUTE
        };
        dialogConfigInner.width = '300px';
        
        const dialogRefInner = this.dialog.open(TimerComponent, dialogConfigInner);

        dialogRefInner.afterClosed().subscribe(result => {
          newPom.end = Date.now().toString();
          newPom.success = result ? false : true;
          this.pomodoroService.addPomodoro(newPom);
        });
      }
    });    
  }

}
