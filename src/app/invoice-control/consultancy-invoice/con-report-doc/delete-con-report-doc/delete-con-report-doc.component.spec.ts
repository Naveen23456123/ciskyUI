import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConReportDocComponent } from './delete-con-report-doc.component';

describe('DeleteConReportDocComponent', () => {
  let component: DeleteConReportDocComponent;
  let fixture: ComponentFixture<DeleteConReportDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConReportDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConReportDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
