import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficeRentComponent } from './view-office-rent.component';

describe('ViewOfficeRentComponent', () => {
  let component: ViewOfficeRentComponent;
  let fixture: ComponentFixture<ViewOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
