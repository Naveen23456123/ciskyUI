import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEditableComponent } from './not-editable.component';

describe('NotEditableComponent', () => {
  let component: NotEditableComponent;
  let fixture: ComponentFixture<NotEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotEditableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
