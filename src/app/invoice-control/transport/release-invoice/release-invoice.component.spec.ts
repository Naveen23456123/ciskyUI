import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseInvoiceComponent } from './release-invoice.component';

describe('ReleaseInvoiceComponent', () => {
  let component: ReleaseInvoiceComponent;
  let fixture: ComponentFixture<ReleaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
