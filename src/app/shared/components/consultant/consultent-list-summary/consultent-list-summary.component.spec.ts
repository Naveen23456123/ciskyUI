import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultentListSummaryComponent } from './consultent-list-summary.component';

describe('ConsultentListSummaryComponent', () => {
  let component: ConsultentListSummaryComponent;
  let fixture: ComponentFixture<ConsultentListSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultentListSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultentListSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
