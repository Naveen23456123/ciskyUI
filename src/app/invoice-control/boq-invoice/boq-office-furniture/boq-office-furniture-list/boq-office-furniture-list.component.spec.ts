import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqOfficeFurnitureListComponent } from './boq-office-furniture-list.component';

describe('BoqOfficeFurnitureListComponent', () => {
  let component: BoqOfficeFurnitureListComponent;
  let fixture: ComponentFixture<BoqOfficeFurnitureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqOfficeFurnitureListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqOfficeFurnitureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
