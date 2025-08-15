import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBankGuaranteeUploadComponent } from './manage-bank-guarantee-upload.component';

describe('ManageBankGuaranteeUploadComponent', () => {
  let component: ManageBankGuaranteeUploadComponent;
  let fixture: ComponentFixture<ManageBankGuaranteeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBankGuaranteeUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBankGuaranteeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
