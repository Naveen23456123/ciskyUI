import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqOfficeFurnitureComponent } from './add-boq-office-furniture.component';

describe('AddBoqOfficeFurnitureComponent', () => {
  let component: AddBoqOfficeFurnitureComponent;
  let fixture: ComponentFixture<AddBoqOfficeFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqOfficeFurnitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqOfficeFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
