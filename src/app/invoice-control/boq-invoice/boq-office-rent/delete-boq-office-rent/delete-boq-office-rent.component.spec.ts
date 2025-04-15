import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqOfficeRentComponent } from './delete-boq-office-rent.component';

describe('DeleteBoqOfficeRentComponent', () => {
  let component: DeleteBoqOfficeRentComponent;
  let fixture: ComponentFixture<DeleteBoqOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
