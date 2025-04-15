import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleDocComponent } from './delete-vehicle-doc.component';

describe('DeleteVehicleDocComponent', () => {
  let component: DeleteVehicleDocComponent;
  let fixture: ComponentFixture<DeleteVehicleDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteVehicleDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVehicleDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
