import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCircularComponent } from './manage-circular.component';

describe('ManageCircularComponent', () => {
  let component: ManageCircularComponent;
  let fixture: ComponentFixture<ManageCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCircularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
