import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDetailsChartComponent } from './income-details-chart.component';

describe('IncomeDetailsChartComponent', () => {
  let component: IncomeDetailsChartComponent;
  let fixture: ComponentFixture<IncomeDetailsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomeDetailsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeDetailsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
