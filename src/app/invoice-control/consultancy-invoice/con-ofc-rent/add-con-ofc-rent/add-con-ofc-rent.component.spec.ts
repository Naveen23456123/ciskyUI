import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConOfcRentComponent } from './add-con-ofc-rent.component';

describe('AddConOfcRentComponent', () => {
  let component: AddConOfcRentComponent;
  let fixture: ComponentFixture<AddConOfcRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConOfcRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConOfcRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
