import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAppPageComponent } from './about-app-page.component';

describe('AboutAppPageComponent', () => {
  let component: AboutAppPageComponent;
  let fixture: ComponentFixture<AboutAppPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAppPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAppPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
