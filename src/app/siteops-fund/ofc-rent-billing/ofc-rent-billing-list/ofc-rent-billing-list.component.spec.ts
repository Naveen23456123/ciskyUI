import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfcRentBillingListComponent } from './ofc-rent-billing-list.component';

describe('OfcRentBillingListComponent', () => {
  let component: OfcRentBillingListComponent;
  let fixture: ComponentFixture<OfcRentBillingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfcRentBillingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfcRentBillingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
