import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyInvoiceComponent } from './consultancy-invoice.component';

describe('ConsultancyInvoiceComponent', () => {
  let component: ConsultancyInvoiceComponent;
  let fixture: ComponentFixture<ConsultancyInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultancyInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultancyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
