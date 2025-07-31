import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExpReqBillingComponent } from './delete-exp-req-billing.component';

describe('DeleteExpReqBillingComponent', () => {
  let component: DeleteExpReqBillingComponent;
  let fixture: ComponentFixture<DeleteExpReqBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteExpReqBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteExpReqBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
