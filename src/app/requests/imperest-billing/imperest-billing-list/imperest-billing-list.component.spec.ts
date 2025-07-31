import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImperestBillingListComponent } from './imperest-billing-list.component';

describe('ImperestBillingListComponent', () => {
  let component: ImperestBillingListComponent;
  let fixture: ComponentFixture<ImperestBillingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImperestBillingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImperestBillingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
