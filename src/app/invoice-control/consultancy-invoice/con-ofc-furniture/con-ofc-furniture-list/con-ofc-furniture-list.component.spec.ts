import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConOfcFurnitureListComponent } from './con-ofc-furniture-list.component';

describe('ConOfcFurnitureListComponent', () => {
  let component: ConOfcFurnitureListComponent;
  let fixture: ComponentFixture<ConOfcFurnitureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConOfcFurnitureListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConOfcFurnitureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
