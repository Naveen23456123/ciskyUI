import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossExpenseComponent } from './profit-loss-expense.component';

describe('ProfitLossExpenseComponent', () => {
  let component: ProfitLossExpenseComponent;
  let fixture: ComponentFixture<ProfitLossExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
