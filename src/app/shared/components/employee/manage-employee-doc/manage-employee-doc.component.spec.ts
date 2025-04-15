import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeDocComponent } from './manage-employee-doc.component';

describe('ManageEmployeeDocComponent', () => {
  let component: ManageEmployeeDocComponent;
  let fixture: ComponentFixture<ManageEmployeeDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageEmployeeDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
