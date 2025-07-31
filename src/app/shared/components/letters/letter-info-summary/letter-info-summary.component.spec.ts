import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterInfoSummaryComponent } from './letter-info-summary.component';

describe('LetterInfoSummaryComponent', () => {
  let component: LetterInfoSummaryComponent;
  let fixture: ComponentFixture<LetterInfoSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterInfoSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
