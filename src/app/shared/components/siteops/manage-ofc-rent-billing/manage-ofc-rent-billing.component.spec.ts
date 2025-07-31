import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfcRentBillingComponent } from './manage-ofc-rent-billing.component';

describe('ManageOfcRentBillingComponent', () => {
  let component: ManageOfcRentBillingComponent;
  let fixture: ComponentFixture<ManageOfcRentBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOfcRentBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOfcRentBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
