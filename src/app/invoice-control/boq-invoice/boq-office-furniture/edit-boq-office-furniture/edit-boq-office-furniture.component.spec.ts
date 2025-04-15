import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqOfficeFurnitureComponent } from './edit-boq-office-furniture.component';

describe('EditBoqOfficeFurnitureComponent', () => {
  let component: EditBoqOfficeFurnitureComponent;
  let fixture: ComponentFixture<EditBoqOfficeFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqOfficeFurnitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqOfficeFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
