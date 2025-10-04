import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageViewOfficeBillingComponent } from './manage-view-office-billing.component';

describe('ManageViewOfficeBillingComponent', () => {
  let component: ManageViewOfficeBillingComponent;
  let fixture: ComponentFixture<ManageViewOfficeBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageViewOfficeBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageViewOfficeBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
