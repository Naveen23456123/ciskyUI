import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadSupervisionComponent } from './manage-upload-supervision.component';

describe('ManageUploadSupervisionComponent', () => {
  let component: ManageUploadSupervisionComponent;
  let fixture: ComponentFixture<ManageUploadSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUploadSupervisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUploadSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
