import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVehcileLogComponent } from './manage-vehcile-log.component';

describe('ManageVehcileLogComponent', () => {
  let component: ManageVehcileLogComponent;
  let fixture: ComponentFixture<ManageVehcileLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageVehcileLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVehcileLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
