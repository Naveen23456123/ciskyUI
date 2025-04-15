import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConReportDocComponent } from './add-con-report-doc.component';

describe('AddConReportDocComponent', () => {
  let component: AddConReportDocComponent;
  let fixture: ComponentFixture<AddConReportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConReportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConReportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
