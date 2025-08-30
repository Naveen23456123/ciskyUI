import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDprInvoiceListComponent } from './manage-dpr-invoice-list.component';

describe('ManageDprInvoiceListComponent', () => {
  let component: ManageDprInvoiceListComponent;
  let fixture: ComponentFixture<ManageDprInvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDprInvoiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDprInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
