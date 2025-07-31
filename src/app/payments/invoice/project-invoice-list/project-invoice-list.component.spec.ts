import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInvoiceListComponent } from './project-invoice-list.component';

describe('ProjectInvoiceListComponent', () => {
  let component: ProjectInvoiceListComponent;
  let fixture: ComponentFixture<ProjectInvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectInvoiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
