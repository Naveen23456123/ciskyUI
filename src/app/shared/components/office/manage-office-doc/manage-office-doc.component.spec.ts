import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfficeDocComponent } from './manage-office-doc.component';

describe('ManageOfficeDocComponent', () => {
  let component: ManageOfficeDocComponent;
  let fixture: ComponentFixture<ManageOfficeDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOfficeDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOfficeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
