import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConOfcFurnitureComponent } from './delete-con-ofc-furniture.component';

describe('DeleteConOfcFurnitureComponent', () => {
  let component: DeleteConOfcFurnitureComponent;
  let fixture: ComponentFixture<DeleteConOfcFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConOfcFurnitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConOfcFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
