import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosInfoSummaryComponent } from './cos-info-summary.component';

describe('CosInfoSummaryComponent', () => {
  let component: CosInfoSummaryComponent;
  let fixture: ComponentFixture<CosInfoSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CosInfoSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CosInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
