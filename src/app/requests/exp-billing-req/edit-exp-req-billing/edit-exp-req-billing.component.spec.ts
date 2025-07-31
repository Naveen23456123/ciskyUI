import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpReqBillingComponent } from './edit-exp-req-billing.component';

describe('EditExpReqBillingComponent', () => {
  let component: EditExpReqBillingComponent;
  let fixture: ComponentFixture<EditExpReqBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExpReqBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExpReqBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
