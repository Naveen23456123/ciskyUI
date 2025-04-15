import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqReportDocComponent } from './delete-boq-report-doc.component';

describe('DeleteBoqReportDocComponent', () => {
  let component: DeleteBoqReportDocComponent;
  let fixture: ComponentFixture<DeleteBoqReportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqReportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqReportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
