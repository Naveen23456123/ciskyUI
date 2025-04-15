import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyInvoiceComponent } from './manage-consultancy-invoice.component';

describe('ManageConsultancyInvoiceComponent', () => {
  let component: ManageConsultancyInvoiceComponent;
  let fixture: ComponentFixture<ManageConsultancyInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
