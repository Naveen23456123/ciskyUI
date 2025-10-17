import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCancelBtnComponent } from './app-cancel-btn.component';

describe('AppCancelBtnComponent', () => {
  let component: AppCancelBtnComponent;
  let fixture: ComponentFixture<AppCancelBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppCancelBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCancelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
