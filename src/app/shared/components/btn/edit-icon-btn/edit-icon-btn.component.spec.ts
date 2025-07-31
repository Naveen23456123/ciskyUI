import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIconBtnComponent } from './edit-icon-btn.component';

describe('EditIconBtnComponent', () => {
  let component: EditIconBtnComponent;
  let fixture: ComponentFixture<EditIconBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditIconBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIconBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
