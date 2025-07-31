import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfcRentBillingComponent } from './add-ofc-rent-billing.component';

describe('AddOfcRentBillingComponent', () => {
  let component: AddOfcRentBillingComponent;
  let fixture: ComponentFixture<AddOfcRentBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOfcRentBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfcRentBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
