import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehicleComponent } from './manage-vehcile.component';

describe('ManageVehcileComponent', () => {
  let component: ManageVehicleComponent;
  let fixture: ComponentFixture<ManageVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
