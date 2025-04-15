import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConReportDocListComponent } from './con-report-doc-list.component';

describe('ConReportDocListComponent', () => {
  let component: ConReportDocListComponent;
  let fixture: ComponentFixture<ConReportDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConReportDocListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConReportDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
