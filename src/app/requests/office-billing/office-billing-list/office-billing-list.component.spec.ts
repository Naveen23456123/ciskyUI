import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeBillingListComponent } from './office-billing-list.component';

describe('OfficeBillingListComponent', () => {
  let component: OfficeBillingListComponent;
  let fixture: ComponentFixture<OfficeBillingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeBillingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeBillingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
