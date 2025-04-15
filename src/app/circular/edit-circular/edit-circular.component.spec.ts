import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCircularComponent } from './edit-circular.component';

describe('EditCircularComponent', () => {
  let component: EditCircularComponent;
  let fixture: ComponentFixture<EditCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCircularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
