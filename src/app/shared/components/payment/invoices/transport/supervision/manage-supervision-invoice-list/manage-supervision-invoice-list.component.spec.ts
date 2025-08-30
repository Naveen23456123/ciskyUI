import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupervisionInvoiceListComponent } from './manage-supervision-invoice-list.component';

describe('ManageSupervisionInvoiceListComponent', () => {
  let component: ManageSupervisionInvoiceListComponent;
  let fixture: ComponentFixture<ManageSupervisionInvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSupervisionInvoiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupervisionInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
