import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOfficeRentComponent } from './delete-office-rent.component';

describe('DeleteOfficeRentComponent', () => {
  let component: DeleteOfficeRentComponent;
  let fixture: ComponentFixture<DeleteOfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteOfficeRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
