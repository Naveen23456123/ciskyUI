import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqOfficeFurnitureComponent } from './delete-boq-office-furniture.component';

describe('DeleteBoqOfficeFurnitureComponent', () => {
  let component: DeleteBoqOfficeFurnitureComponent;
  let fixture: ComponentFixture<DeleteBoqOfficeFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqOfficeFurnitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqOfficeFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
