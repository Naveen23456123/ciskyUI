import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoSummaryComponent } from './employee-info-summary.component';

describe('EmployeeInfoSummaryComponent', () => {
  let component: EmployeeInfoSummaryComponent;
  let fixture: ComponentFixture<EmployeeInfoSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeInfoSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
