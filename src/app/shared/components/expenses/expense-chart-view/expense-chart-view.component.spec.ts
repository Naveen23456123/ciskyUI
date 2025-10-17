import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseChartViewComponent } from './expense-chart-view.component';

describe('ExpenseChartViewComponent', () => {
  let component: ExpenseChartViewComponent;
  let fixture: ComponentFixture<ExpenseChartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseChartViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
