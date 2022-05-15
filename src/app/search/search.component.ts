import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IFoundedTask } from './models/foundedtask.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

allTasks$: Observable<IFoundedTask[]>;
foundedTasks: IFoundedTask[] = [];
search: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient )
  { 
    this.route.queryParams.subscribe(params => {
      this.search = params['str'];
    });
    this.allTasks$ = this.getTasks();
  }

  getTasks(): Observable<IFoundedTask[]> {
    return this.http.get<IFoundedTask[]>(`search/tasks`);
  }

  ngOnInit(): void {
    const regexp = new RegExp(this.search);
    this.allTasks$.subscribe((tasks) => {
      this.foundedTasks = tasks.filter(item => {
        const userName = item.user ? item.user.name : '';
        return regexp.test(item.title) || regexp.test(item.description) 
          || regexp.test(userName) || regexp.test(item.order.toString());
      });
    });
  }

}
