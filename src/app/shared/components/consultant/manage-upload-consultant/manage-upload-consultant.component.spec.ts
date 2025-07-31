import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadConsultantComponent } from './manage-upload-consultant.component';

describe('ManageUploadConsultantComponent', () => {
  let component: ManageUploadConsultantComponent;
  let fixture: ComponentFixture<ManageUploadConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUploadConsultantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUploadConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
