import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImperestReqBillingComponent } from './delete-imperest-req-billing.component';

describe('DeleteImperestReqBillingComponent', () => {
  let component: DeleteImperestReqBillingComponent;
  let fixture: ComponentFixture<DeleteImperestReqBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteImperestReqBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteImperestReqBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
