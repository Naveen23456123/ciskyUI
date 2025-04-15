import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfficeRentComponent } from './edit-office-rent.component';

describe('EditOfficeRentComponent', () => {
  let component: EditOfficeRentComponent;
  let fixture: ComponentFixture<EditOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
