import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBtnComponent } from './upload-btn.component';

describe('UploadBtnComponent', () => {
  let component: UploadBtnComponent;
  let fixture: ComponentFixture<UploadBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
