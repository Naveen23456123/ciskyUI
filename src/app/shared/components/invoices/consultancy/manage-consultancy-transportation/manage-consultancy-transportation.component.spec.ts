import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultancyTransportationComponent } from './manage-consultancy-transportation.component';

describe('ManageConsultancyTransportationComponent', () => {
  let component: ManageConsultancyTransportationComponent;
  let fixture: ComponentFixture<ManageConsultancyTransportationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultancyTransportationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultancyTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
