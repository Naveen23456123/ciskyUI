import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleBillingComponent } from './add-vehicle-billing.component';

describe('AddVehicleBillingComponent', () => {
  let component: AddVehicleBillingComponent;
  let fixture: ComponentFixture<AddVehicleBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVehicleBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicleBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
