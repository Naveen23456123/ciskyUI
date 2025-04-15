import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyReportDocComponent } from './manage-consultancy-report-doc.component';

describe('ManageConsultancyReportDocComponent', () => {
  let component: ManageConsultancyReportDocComponent;
  let fixture: ComponentFixture<ManageConsultancyReportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyReportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyReportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
