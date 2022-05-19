import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroItemComponent } from './pomodoro-item.component';

describe('PomodoroItemComponent', () => {
  let component: PomodoroItemComponent;
  let fixture: ComponentFixture<PomodoroItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomodoroItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomodoroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
