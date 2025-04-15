import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleBillingComponent } from './delete-vehicle-billing.component';

describe('DeleteVehicleBillingComponent', () => {
  let component: DeleteVehicleBillingComponent;
  let fixture: ComponentFixture<DeleteVehicleBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteVehicleBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVehicleBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
