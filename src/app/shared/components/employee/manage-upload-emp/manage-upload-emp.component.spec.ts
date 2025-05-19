import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadEmpComponent } from './manage-upload-emp.component';

describe('ManageUploadEmpComponent', () => {
  let component: ManageUploadEmpComponent;
  let fixture: ComponentFixture<ManageUploadEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUploadEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUploadEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
