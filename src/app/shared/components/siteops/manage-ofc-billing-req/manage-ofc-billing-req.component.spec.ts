import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfcBillingReqComponent } from './manage-ofc-billing-req.component';

describe('ManageOfcBillingReqComponent', () => {
  let component: ManageOfcBillingReqComponent;
  let fixture: ComponentFixture<ManageOfcBillingReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOfcBillingReqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOfcBillingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
