import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossMarginComponent } from './profit-loss-margin.component';

describe('ProfitLossMarginComponent', () => {
  let component: ProfitLossMarginComponent;
  let fixture: ComponentFixture<ProfitLossMarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfitLossMarginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitLossMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
