import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfficeRentComponent } from './add-office-rent.component';

describe('AddOfficeRentComponent', () => {
  let component: AddOfficeRentComponent;
  let fixture: ComponentFixture<AddOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
