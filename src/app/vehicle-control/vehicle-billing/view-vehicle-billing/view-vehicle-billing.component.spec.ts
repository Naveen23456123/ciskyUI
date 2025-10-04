import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVehicleBillingComponent } from './view-vehicle-billing.component';

describe('ViewVehicleBillingComponent', () => {
  let component: ViewVehicleBillingComponent;
  let fixture: ComponentFixture<ViewVehicleBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewVehicleBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVehicleBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
