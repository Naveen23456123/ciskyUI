import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpReqBillingListComponent } from './exp-req-billing-list.component';

describe('ExpReqBillingListComponent', () => {
  let component: ExpReqBillingListComponent;
  let fixture: ComponentFixture<ExpReqBillingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpReqBillingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpReqBillingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
