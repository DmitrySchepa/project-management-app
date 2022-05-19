import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePomodoroComponent } from './create-pomodoro.component';

describe('CreatePomodoroComponent', () => {
  let component: CreatePomodoroComponent;
  let fixture: ComponentFixture<CreatePomodoroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePomodoroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePomodoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
