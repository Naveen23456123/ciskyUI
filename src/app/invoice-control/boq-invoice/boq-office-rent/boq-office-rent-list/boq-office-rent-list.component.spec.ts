import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqOfficeRentListComponent } from './boq-office-rent-list.component';

describe('BoqOfficeRentListComponent', () => {
  let component: BoqOfficeRentListComponent;
  let fixture: ComponentFixture<BoqOfficeRentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqOfficeRentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqOfficeRentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
