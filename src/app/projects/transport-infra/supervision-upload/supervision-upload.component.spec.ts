import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionUploadComponent } from './supervision-upload.component';

describe('SupervisionUploadComponent', () => {
  let component: SupervisionUploadComponent;
  let fixture: ComponentFixture<SupervisionUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupervisionUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
