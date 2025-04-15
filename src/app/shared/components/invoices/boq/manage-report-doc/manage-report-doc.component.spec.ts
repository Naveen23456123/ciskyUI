import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReportDocComponent } from './manage-report-doc.component';

describe('ManageReportDocComponent', () => {
  let component: ManageReportDocComponent;
  let fixture: ComponentFixture<ManageReportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageReportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
