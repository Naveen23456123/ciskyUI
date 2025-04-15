import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBillingListComponent } from './vehicle-billing-list.component';

describe('VehicleBillingListComponent', () => {
  let component: VehicleBillingListComponent;
  let fixture: ComponentFixture<VehicleBillingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleBillingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleBillingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
