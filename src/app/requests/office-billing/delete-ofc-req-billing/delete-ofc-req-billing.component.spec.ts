import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOfcReqBillingComponent } from './delete-ofc-req-billing.component';

describe('DeleteOfcReqBillingComponent', () => {
  let component: DeleteOfcReqBillingComponent;
  let fixture: ComponentFixture<DeleteOfcReqBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteOfcReqBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOfcReqBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
