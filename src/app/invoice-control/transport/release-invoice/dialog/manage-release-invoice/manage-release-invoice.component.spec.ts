import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReleaseInvoiceComponent } from './manage-release-invoice.component';

describe('ManageReleaseInvoiceComponent', () => {
  let component: ManageReleaseInvoiceComponent;
  let fixture: ComponentFixture<ManageReleaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageReleaseInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReleaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
