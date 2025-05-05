import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDeptComponent } from './upload-dept.component';

describe('UploadDeptComponent', () => {
  let component: UploadDeptComponent;
  let fixture: ComponentFixture<UploadDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDeptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
