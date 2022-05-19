import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroListComponent } from './pomodoro-list.component';

describe('PomodoroListComponent', () => {
  let component: PomodoroListComponent;
  let fixture: ComponentFixture<PomodoroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomodoroListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomodoroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
