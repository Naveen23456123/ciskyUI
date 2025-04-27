import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCostListComponent } from './finance-cost-list.component';

describe('FinanceCostListComponent', () => {
  let component: FinanceCostListComponent;
  let fixture: ComponentFixture<FinanceCostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanceCostListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
