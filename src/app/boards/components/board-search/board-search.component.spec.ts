import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSearchComponent } from './board-search.component';

describe('BoardSearchComponent', () => {
  let component: BoardSearchComponent;
  let fixture: ComponentFixture<BoardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
