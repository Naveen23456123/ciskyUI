import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsultantAccountComponent } from './manage-consultant-account.component';

describe('ManageConsultantAccountComponent', () => {
  let component: ManageConsultantAccountComponent;
  let fixture: ComponentFixture<ManageConsultantAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageConsultantAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConsultantAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
