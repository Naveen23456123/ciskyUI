import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLoadBtnComponent } from './submit-load-btn.component';

describe('SubmitLoadBtnComponent', () => {
  let component: SubmitLoadBtnComponent;
  let fixture: ComponentFixture<SubmitLoadBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitLoadBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitLoadBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
