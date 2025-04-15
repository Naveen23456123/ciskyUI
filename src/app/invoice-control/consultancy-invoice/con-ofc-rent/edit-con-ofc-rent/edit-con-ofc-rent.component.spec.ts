import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConOfcRentComponent } from './edit-con-ofc-rent.component';

describe('EditConOfcRentComponent', () => {
  let component: EditConOfcRentComponent;
  let fixture: ComponentFixture<EditConOfcRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditConOfcRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConOfcRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
