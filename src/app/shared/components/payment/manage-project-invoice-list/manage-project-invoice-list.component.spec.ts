import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectInvoiceListComponent } from './manage-project-invoice-list.component';

describe('ManageProjectInvoiceListComponent', () => {
  let component: ManageProjectInvoiceListComponent;
  let fixture: ComponentFixture<ManageProjectInvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageProjectInvoiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProjectInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
