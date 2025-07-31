import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfcRentBillingComponent } from './edit-ofc-rent-billing.component';

describe('EditOfcRentBillingComponent', () => {
  let component: EditOfcRentBillingComponent;
  let fixture: ComponentFixture<EditOfcRentBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOfcRentBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOfcRentBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
