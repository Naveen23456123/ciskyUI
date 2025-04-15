import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorBillingAddComponent } from './contractor-billing-add.component';

describe('ContractorBillingAddComponent', () => {
  let component: ContractorBillingAddComponent;
  let fixture: ComponentFixture<ContractorBillingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorBillingAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorBillingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
