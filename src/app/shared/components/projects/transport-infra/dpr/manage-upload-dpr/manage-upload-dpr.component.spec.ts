import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadDprComponent } from './manage-upload-dpr.component';

describe('ManageUploadDprComponent', () => {
  let component: ManageUploadDprComponent;
  let fixture: ComponentFixture<ManageUploadDprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUploadDprComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUploadDprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
