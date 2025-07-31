import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EotInfoSummaryComponent } from './eot-info-summary.component';

describe('EotInfoSummaryComponent', () => {
  let component: EotInfoSummaryComponent;
  let fixture: ComponentFixture<EotInfoSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EotInfoSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EotInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
