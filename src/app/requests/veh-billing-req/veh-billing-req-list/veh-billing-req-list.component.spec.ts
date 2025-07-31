import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehBillingReqListComponent } from './veh-billing-req-list.component';

describe('VehBillingReqListComponent', () => {
  let component: VehBillingReqListComponent;
  let fixture: ComponentFixture<VehBillingReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehBillingReqListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehBillingReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
