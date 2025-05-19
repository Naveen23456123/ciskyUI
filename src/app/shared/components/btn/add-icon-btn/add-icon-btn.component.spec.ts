import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIconBtnComponent } from './add-icon-btn.component';

describe('AddIconBtnComponent', () => {
  let component: AddIconBtnComponent;
  let fixture: ComponentFixture<AddIconBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddIconBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIconBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
