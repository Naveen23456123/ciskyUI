import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageImperestComponent } from './manage-imperest.component';

describe('ManageImperestComponent', () => {
  let component: ManageImperestComponent;
  let fixture: ComponentFixture<ManageImperestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageImperestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageImperestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
