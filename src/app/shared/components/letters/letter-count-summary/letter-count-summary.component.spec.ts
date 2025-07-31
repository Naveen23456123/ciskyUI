import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterCountSummaryComponent } from './letter-count-summary.component';

describe('LetterCountSummaryComponent', () => {
  let component: LetterCountSummaryComponent;
  let fixture: ComponentFixture<LetterCountSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterCountSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterCountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
