import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehReqBillingComponent } from './edit-veh-req-billing.component';

describe('EditVehReqBillingComponent', () => {
  let component: EditVehReqBillingComponent;
  let fixture: ComponentFixture<EditVehReqBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVehReqBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehReqBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
