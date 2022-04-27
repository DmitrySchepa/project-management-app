import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  public boardId!: string;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.params['id'];
  }
}
