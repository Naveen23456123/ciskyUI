import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqReportDocComponent } from './add-boq-report-doc.component';

describe('AddBoqReportDocComponent', () => {
  let component: AddBoqReportDocComponent;
  let fixture: ComponentFixture<AddBoqReportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqReportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqReportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
