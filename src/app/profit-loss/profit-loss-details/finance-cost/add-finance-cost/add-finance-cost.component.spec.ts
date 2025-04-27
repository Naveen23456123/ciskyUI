import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinanceCostComponent } from './add-finance-cost.component';

describe('AddFinanceCostComponent', () => {
  let component: AddFinanceCostComponent;
  let fixture: ComponentFixture<AddFinanceCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFinanceCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFinanceCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
