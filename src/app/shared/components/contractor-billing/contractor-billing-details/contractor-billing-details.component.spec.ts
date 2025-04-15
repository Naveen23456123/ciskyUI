import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorBillingDetailsComponent } from './contractor-billing-details.component';

describe('ContractorBillingDetailsComponent', () => {
  let component: ContractorBillingDetailsComponent;
  let fixture: ComponentFixture<ContractorBillingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorBillingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorBillingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
