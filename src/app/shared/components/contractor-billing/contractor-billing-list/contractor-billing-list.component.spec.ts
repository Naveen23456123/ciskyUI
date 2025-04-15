import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorBillingListComponent } from './contractor-billing-list.component';

describe('ContractorBillingListComponent', () => {
  let component: ContractorBillingListComponent;
  let fixture: ComponentFixture<ContractorBillingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractorBillingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractorBillingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
