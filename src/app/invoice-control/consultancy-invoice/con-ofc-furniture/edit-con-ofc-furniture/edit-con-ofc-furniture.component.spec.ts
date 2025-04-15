import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConOfcFurnitureComponent } from './edit-con-ofc-furniture.component';

describe('EditConOfcFurnitureComponent', () => {
  let component: EditConOfcFurnitureComponent;
  let fixture: ComponentFixture<EditConOfcFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConOfcFurnitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConOfcFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
