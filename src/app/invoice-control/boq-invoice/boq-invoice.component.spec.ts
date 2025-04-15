import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqInvoiceComponent } from './boq-invoice.component';

describe('BoqInvoiceComponent', () => {
  let component: BoqInvoiceComponent;
  let fixture: ComponentFixture<BoqInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
