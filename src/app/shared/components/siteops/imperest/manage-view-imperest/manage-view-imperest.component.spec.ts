import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageViewImperestComponent } from './manage-view-imperest.component';

describe('ManageViewImperestComponent', () => {
  let component: ManageViewImperestComponent;
  let fixture: ComponentFixture<ManageViewImperestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageViewImperestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageViewImperestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
