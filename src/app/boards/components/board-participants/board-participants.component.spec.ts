import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardParticipantsComponent } from './board-participants.component';

describe('BoardParticipantsComponent', () => {
  let component: BoardParticipantsComponent;
  let fixture: ComponentFixture<BoardParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardParticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
