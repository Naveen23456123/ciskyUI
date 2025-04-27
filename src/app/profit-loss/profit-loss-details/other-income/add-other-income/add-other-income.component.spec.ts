import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherIncomeComponent } from './add-other-income.component';

describe('AddOtherIncomeComponent', () => {
  let component: AddOtherIncomeComponent;
  let fixture: ComponentFixture<AddOtherIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOtherIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOtherIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
