import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroEditComponent } from './pomodoro-edit.component';

describe('PomodoroEditComponent', () => {
  let component: PomodoroEditComponent;
  let fixture: ComponentFixture<PomodoroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomodoroEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PomodoroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
