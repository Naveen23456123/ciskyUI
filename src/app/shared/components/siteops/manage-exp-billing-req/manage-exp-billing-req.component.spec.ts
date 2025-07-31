import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExpBillingReqComponent } from './manage-exp-billing-req.component';

describe('ManageExpBillingReqComponent', () => {
  let component: ManageExpBillingReqComponent;
  let fixture: ComponentFixture<ManageExpBillingReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageExpBillingReqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExpBillingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
