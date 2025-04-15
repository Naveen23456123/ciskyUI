import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleBillingComponent } from './edit-vehicle-billing.component';

describe('EditVehicleBillingComponent', () => {
  let component: EditVehicleBillingComponent;
  let fixture: ComponentFixture<EditVehicleBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVehicleBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehicleBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
