import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleLogComponent } from './delete-vehicle-log.component';

describe('DeleteVehicleLogComponent', () => {
  let component: DeleteVehicleLogComponent;
  let fixture: ComponentFixture<DeleteVehicleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteVehicleLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVehicleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
