import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehReqBillingComponent } from './delete-veh-req-billing.component';

describe('DeleteVehReqBillingComponent', () => {
  let component: DeleteVehReqBillingComponent;
  let fixture: ComponentFixture<DeleteVehReqBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteVehReqBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVehReqBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
