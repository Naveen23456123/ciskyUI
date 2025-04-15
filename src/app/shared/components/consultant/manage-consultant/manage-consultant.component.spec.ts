import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultantComponent } from './manage-consultant.component';

describe('ManageConsultantComponent', () => {
  let component: ManageConsultantComponent;
  let fixture: ComponentFixture<ManageConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
