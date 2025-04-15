import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthAndYearPickerComponent } from './month-and-year-picker.component';

describe('MonthAndYearPickerComponent', () => {
  let component: MonthAndYearPickerComponent;
  let fixture: ComponentFixture<MonthAndYearPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthAndYearPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthAndYearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
