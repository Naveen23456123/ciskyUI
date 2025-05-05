import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDesgComponent } from './upload-desg.component';

describe('UploadDesgComponent', () => {
  let component: UploadDesgComponent;
  let fixture: ComponentFixture<UploadDesgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDesgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDesgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
