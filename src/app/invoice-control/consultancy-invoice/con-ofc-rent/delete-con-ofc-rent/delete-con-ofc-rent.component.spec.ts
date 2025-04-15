import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConOfcRentComponent } from './delete-con-ofc-rent.component';

describe('DeleteConOfcRentComponent', () => {
  let component: DeleteConOfcRentComponent;
  let fixture: ComponentFixture<DeleteConOfcRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConOfcRentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConOfcRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
