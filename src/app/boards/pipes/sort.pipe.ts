import { Pipe, PipeTransform } from '@angular/core';
import { BoardColumn, BoardTask } from '../models/board.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(columns: Array<BoardColumn | BoardTask>): Array<any> {
    if (columns.length === 0) return columns;
    return columns.sort((a, b) => a.order - b.order);
  }
}
