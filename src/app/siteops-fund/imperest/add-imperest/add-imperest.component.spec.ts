import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImperestComponent } from './add-imperest.component';

describe('AddImperestComponent', () => {
  let component: AddImperestComponent;
  let fixture: ComponentFixture<AddImperestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddImperestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImperestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
