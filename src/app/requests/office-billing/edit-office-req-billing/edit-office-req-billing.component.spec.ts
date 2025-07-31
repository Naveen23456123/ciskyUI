import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfficeReqBillingComponent } from './edit-office-req-billing.component';

describe('EditOfficeReqBillingComponent', () => {
  let component: EditOfficeReqBillingComponent;
  let fixture: ComponentFixture<EditOfficeReqBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOfficeReqBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOfficeReqBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
