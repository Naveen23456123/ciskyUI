import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImperestReqBillingComponent } from './edit-imperest-req-billing.component';

describe('EditImperestReqBillingComponent', () => {
  let component: EditImperestReqBillingComponent;
  let fixture: ComponentFixture<EditImperestReqBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditImperestReqBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImperestReqBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
