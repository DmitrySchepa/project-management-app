import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  enableSticky: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    fromEvent(window, 'scroll').subscribe(() => {
      if (this.document.defaultView!.scrollY > 0) {
        this.enableSticky = true;
      } else {
        this.enableSticky = false;
      }
    });
  }
}
