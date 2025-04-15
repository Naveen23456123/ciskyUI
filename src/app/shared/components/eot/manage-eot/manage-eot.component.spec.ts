import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEotComponent } from './manage-eot.component';

describe('ManageEotComponent', () => {
  let component: ManageEotComponent;
  let fixture: ComponentFixture<ManageEotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageEotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
