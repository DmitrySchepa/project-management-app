import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IPomodoro } from '../../models/pomodoro.model';
import { PomodoroService } from '../../services/pomodoro.service';
import { PomodoroEditComponent } from '../pomodoro-edit/pomodoro-edit.component';

@Component({
  selector: 'app-pomodoro-item',
  templateUrl: './pomodoro-item.component.html',
  styleUrls: ['./pomodoro-item.component.scss']
})
export class PomodoroItemComponent implements OnInit {
  @Input() pomodoro: IPomodoro = {
    description: "Здесь какое-то описание",
    end: "1652888726630",
    id: "id1652888726630",
    name: "First Pomodoro",
    start: "1652888726630",
    success: true
  };

  constructor(private pomodoroService: PomodoroService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editPomodoro() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      name: this.pomodoro.name,
      description: this.pomodoro.description,
    };

    const dialogRef = this.dialog.open(PomodoroEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pomodoro.name = result.name;
        this.pomodoro.description = result.description;
        this.pomodoroService.updatePomodoro(this.pomodoro);
      }
    });

  }

  deletePomodoro(id:string): void {
    this.pomodoroService.removeById(id);
  }

  setPomodoroSuccess(id:string): void {
    if(!this.pomodoro.success) {
      this.pomodoro.success = true;
      this.pomodoroService.updatePomodoro(this.pomodoro);
    }
  }

  setPomodoroFail(id:string): void {
    if(this.pomodoro.success) {
      this.pomodoro.success = false;
      this.pomodoroService.updatePomodoro(this.pomodoro);
    }
  }

}
