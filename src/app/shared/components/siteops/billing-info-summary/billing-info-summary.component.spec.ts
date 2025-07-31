import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingInfoSummaryComponent } from './billing-info-summary.component';

describe('BillingInfoSummaryComponent', () => {
  let component: BillingInfoSummaryComponent;
  let fixture: ComponentFixture<BillingInfoSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingInfoSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
