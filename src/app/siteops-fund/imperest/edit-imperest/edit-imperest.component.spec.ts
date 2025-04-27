import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImperestComponent } from './edit-imperest.component';

describe('EditImperestComponent', () => {
  let component: EditImperestComponent;
  let fixture: ComponentFixture<EditImperestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditImperestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImperestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
