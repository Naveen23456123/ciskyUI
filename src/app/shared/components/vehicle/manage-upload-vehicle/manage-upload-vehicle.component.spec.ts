import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadVehicleComponent } from './manage-upload-vehicle.component';

describe('ManageUploadVehicleComponent', () => {
  let component: ManageUploadVehicleComponent;
  let fixture: ComponentFixture<ManageUploadVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUploadVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUploadVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
