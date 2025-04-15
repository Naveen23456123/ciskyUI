import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContractorBillingComponent } from './manage-contractor-billing.component';

describe('ManageContractorBillingComponent', () => {
  let component: ManageContractorBillingComponent;
  let fixture: ComponentFixture<ManageContractorBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageContractorBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageContractorBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
