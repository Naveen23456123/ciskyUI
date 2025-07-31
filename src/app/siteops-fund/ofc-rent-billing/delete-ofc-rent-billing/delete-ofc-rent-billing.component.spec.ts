import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOfcRentBillingComponent } from './delete-ofc-rent-billing.component';

describe('DeleteOfcRentBillingComponent', () => {
  let component: DeleteOfcRentBillingComponent;
  let fixture: ComponentFixture<DeleteOfcRentBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteOfcRentBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOfcRentBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
