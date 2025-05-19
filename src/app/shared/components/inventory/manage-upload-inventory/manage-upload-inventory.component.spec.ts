import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadInventoryComponent } from './manage-upload-inventory.component';

describe('ManageUploadInventoryComponent', () => {
  let component: ManageUploadInventoryComponent;
  let fixture: ComponentFixture<ManageUploadInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUploadInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUploadInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
