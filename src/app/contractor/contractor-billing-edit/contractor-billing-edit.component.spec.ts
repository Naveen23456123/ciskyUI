import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorBillingEditComponent } from './contractor-billing-edit.component';

describe('ContractorBillingEditComponent', () => {
  let component: ContractorBillingEditComponent;
  let fixture: ComponentFixture<ContractorBillingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorBillingEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorBillingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
