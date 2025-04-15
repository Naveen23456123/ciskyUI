import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeListComponent } from './manage-employee-list.component';

describe('ManageEmployeeListComponent', () => {
  let component: ManageEmployeeListComponent;
  let fixture: ComponentFixture<ManageEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageEmployeeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
