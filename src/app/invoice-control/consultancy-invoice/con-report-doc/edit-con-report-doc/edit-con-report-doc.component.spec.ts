import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConReportDocComponent } from './edit-con-report-doc.component';

describe('EditConReportDocComponent', () => {
  let component: EditConReportDocComponent;
  let fixture: ComponentFixture<EditConReportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConReportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConReportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
