import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDateFiltersComponent } from './financial-date-filters.component';

describe('FinancialDateFiltersComponent', () => {
  let component: FinancialDateFiltersComponent;
  let fixture: ComponentFixture<FinancialDateFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancialDateFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialDateFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
