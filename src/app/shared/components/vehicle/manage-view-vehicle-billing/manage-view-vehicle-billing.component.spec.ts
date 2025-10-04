import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageViewVehicleBillingComponent } from './manage-view-vehicle-billing.component';

describe('ManageViewVehicleBillingComponent', () => {
  let component: ManageViewVehicleBillingComponent;
  let fixture: ComponentFixture<ManageViewVehicleBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageViewVehicleBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageViewVehicleBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
