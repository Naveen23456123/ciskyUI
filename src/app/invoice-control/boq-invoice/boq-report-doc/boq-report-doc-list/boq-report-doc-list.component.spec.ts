import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqReportDocListComponent } from './boq-report-doc-list.component';

describe('BoqReportDocListComponent', () => {
  let component: BoqReportDocListComponent;
  let fixture: ComponentFixture<BoqReportDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqReportDocListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqReportDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
