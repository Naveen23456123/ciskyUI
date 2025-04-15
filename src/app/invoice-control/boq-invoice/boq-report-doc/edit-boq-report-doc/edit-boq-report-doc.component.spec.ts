import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqReportDocComponent } from './edit-boq-report-doc.component';

describe('EditBoqReportDocComponent', () => {
  let component: EditBoqReportDocComponent;
  let fixture: ComponentFixture<EditBoqReportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqReportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqReportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
