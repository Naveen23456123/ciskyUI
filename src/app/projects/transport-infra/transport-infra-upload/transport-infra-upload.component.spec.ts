import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportInfraUploadComponent } from './transport-infra-upload.component';

describe('TransportInfraUploadComponent', () => {
  let component: TransportInfraUploadComponent;
  let fixture: ComponentFixture<TransportInfraUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportInfraUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportInfraUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
