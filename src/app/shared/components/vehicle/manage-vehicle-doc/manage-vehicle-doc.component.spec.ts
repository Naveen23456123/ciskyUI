import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehicleDocComponent } from './manage-vehicle-doc.component';

describe('ManageVehicleDocComponent', () => {
  let component: ManageVehicleDocComponent;
  let fixture: ComponentFixture<ManageVehicleDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVehicleDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVehicleDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
