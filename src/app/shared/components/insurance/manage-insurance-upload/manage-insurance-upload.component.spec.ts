import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInsuranceUploadComponent } from './manage-insurance-upload.component';

describe('ManageInsuranceUploadComponent', () => {
  let component: ManageInsuranceUploadComponent;
  let fixture: ComponentFixture<ManageInsuranceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageInsuranceUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInsuranceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
