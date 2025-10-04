import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficeBillingComponent } from './view-office-billing.component';

describe('ViewOfficeBillingComponent', () => {
  let component: ViewOfficeBillingComponent;
  let fixture: ComponentFixture<ViewOfficeBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOfficeBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficeBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
