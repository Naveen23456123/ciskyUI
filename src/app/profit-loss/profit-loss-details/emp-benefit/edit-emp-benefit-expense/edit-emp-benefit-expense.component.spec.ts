import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpBenefitExpenseComponent } from './edit-emp-benefit-expense.component';

describe('EditEmpBenefitExpenseComponent', () => {
  let component: EditEmpBenefitExpenseComponent;
  let fixture: ComponentFixture<EditEmpBenefitExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmpBenefitExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmpBenefitExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
