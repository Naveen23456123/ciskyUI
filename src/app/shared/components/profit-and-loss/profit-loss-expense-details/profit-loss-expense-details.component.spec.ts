import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossExpenseDetailsComponent } from './profit-loss-expense-details.component';

describe('ProfitLossExpenseDetailsComponent', () => {
  let component: ProfitLossExpenseDetailsComponent;
  let fixture: ComponentFixture<ProfitLossExpenseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossExpenseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossExpenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
