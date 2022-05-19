import { Injectable } from '@angular/core';
import { IPomodoro } from '../models/pomodoro.model';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {

  generateUniqueId(): string {
    return 'id' + (new Date()).getTime();
  }

  getAll(): IPomodoro[] | null {
    const data = localStorage.getItem('pma-pomodoro');    
    return data ? JSON.parse(data) : null;
  }

  getById(id: string): IPomodoro | null {
    const data = localStorage.getItem('pma-pomodoro');
    if (data) {
      const arr = JSON.parse(data) as IPomodoro[];
      const founded = arr.filter(item => item.id === id);
      return founded.length ? founded[0] : null;
    }
    return null;
  }

  addPomodoro(item: IPomodoro): void {
    const data = localStorage.getItem('pma-pomodoro');
    if (data) {
      const arr = JSON.parse(data) as IPomodoro[];
      localStorage.setItem('pma-pomodoro', JSON.stringify([...arr, item]));
    } else {
      localStorage.setItem('pma-pomodoro', JSON.stringify([item]));
    } 
  }

  removeAll():void {
    localStorage.removeItem('pma-pomodoro');
  }

  removeById(id:string):void {
    const data = localStorage.getItem('pma-pomodoro');
    if (data) {
      const arr = JSON.parse(data) as IPomodoro[];
      const idx = arr.findIndex(item => item.id === id);
      if (idx !== -1) {
        localStorage.setItem('pma-pomodoro', 
          JSON.stringify(arr.splice(0,idx).concat(arr.splice(idx))));
      }
    }
  }

  updatePomodoro(pom: IPomodoro):void {
    const data = localStorage.getItem('pma-pomodoro');
    if (data) {
      const arr = JSON.parse(data) as IPomodoro[];
      const idx = arr.findIndex(item => item.id === pom.id);
      if (idx !== -1) {
        arr[idx] = pom;
        localStorage.setItem('pma-pomodoro', JSON.stringify(arr));
      }
    }
  }

}
