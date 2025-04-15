import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehcileBillingComponent } from './manage-vehcile-billing.component';

describe('ManageVehcileBillingComponent', () => {
  let component: ManageVehcileBillingComponent;
  let fixture: ComponentFixture<ManageVehcileBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVehcileBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVehcileBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
