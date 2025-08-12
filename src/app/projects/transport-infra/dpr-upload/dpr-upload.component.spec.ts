import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprUploadComponent } from './dpr-upload.component';

describe('DprUploadComponent', () => {
  let component: DprUploadComponent;
  let fixture: ComponentFixture<DprUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DprUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
