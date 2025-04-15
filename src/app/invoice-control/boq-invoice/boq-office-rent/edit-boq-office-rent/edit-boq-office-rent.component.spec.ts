import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqOfficeRentComponent } from './edit-boq-office-rent.component';

describe('EditBoqOfficeRentComponent', () => {
  let component: EditBoqOfficeRentComponent;
  let fixture: ComponentFixture<EditBoqOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
