import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadLettersComponent } from './manage-upload-letters.component';

describe('ManageUploadLettersComponent', () => {
  let component: ManageUploadLettersComponent;
  let fixture: ComponentFixture<ManageUploadLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUploadLettersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUploadLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
