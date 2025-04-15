import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoqInvoiceComponent } from './manage-boq-invoice.component';

describe('ManageBoqInvoiceComponent', () => {
  let component: ManageBoqInvoiceComponent;
  let fixture: ComponentFixture<ManageBoqInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBoqInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBoqInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
