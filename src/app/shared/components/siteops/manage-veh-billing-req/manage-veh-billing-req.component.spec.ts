import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehBillingReqComponent } from './manage-veh-billing-req.component';

describe('ManageVehBillingReqComponent', () => {
  let component: ManageVehBillingReqComponent;
  let fixture: ComponentFixture<ManageVehBillingReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVehBillingReqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVehBillingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
