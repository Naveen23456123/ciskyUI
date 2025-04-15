import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqOfficeRentComponent } from './add-boq-office-rent.component';

describe('AddBoqOfficeRentComponent', () => {
  let component: AddBoqOfficeRentComponent;
  let fixture: ComponentFixture<AddBoqOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
