import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITimer } from '../../models/pomodoro.model';

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_HOUR = 3600;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  duration: number = 0;
  interval: number = 0;
  constructor(
    private dialogRef: MatDialogRef<TimerComponent>,
    @Inject(MAT_DIALOG_DATA) { duration }:ITimer
  ) {
    this.duration = duration;
  }

  formatTime(curTime:number):string {
    const seconds = curTime % SECONDS_IN_MINUTE;
    const hours = (curTime - curTime % SECONDS_IN_HOUR)/SECONDS_IN_HOUR;
    const minutes = (curTime - hours * SECONDS_IN_HOUR - seconds)/MINUTES_IN_HOUR;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.interval = window.setInterval(() => {
      if(this.duration > 0) {
        this.duration--;
      } else {
        clearInterval(this.interval);
        this.dialogRef.close(0); 
      }
    },1000)
  }

  onStop() {
    clearInterval(this.interval);
    this.dialogRef.close(this.duration);
  }

}
