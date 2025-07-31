import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageImperestBillingReqComponent } from './manage-imperest-billing-req.component';

describe('ManageImperestBillingReqComponent', () => {
  let component: ManageImperestBillingReqComponent;
  let fixture: ComponentFixture<ManageImperestBillingReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageImperestBillingReqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageImperestBillingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
