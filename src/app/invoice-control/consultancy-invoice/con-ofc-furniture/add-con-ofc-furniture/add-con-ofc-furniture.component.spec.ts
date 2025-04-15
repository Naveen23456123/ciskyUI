import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConOfcFurnitureComponent } from './add-con-ofc-furniture.component';

describe('AddConOfcFurnitureComponent', () => {
  let component: AddConOfcFurnitureComponent;
  let fixture: ComponentFixture<AddConOfcFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConOfcFurnitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConOfcFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
