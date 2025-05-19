import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLetterComponent } from './upload-letter.component';

describe('UploadLetterComponent', () => {
  let component: UploadLetterComponent;
  let fixture: ComponentFixture<UploadLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
