import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanicalYearComponent } from './finanical-year.component';

describe('FinanicalYearComponent', () => {
  let component: FinanicalYearComponent;
  let fixture: ComponentFixture<FinanicalYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanicalYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanicalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
