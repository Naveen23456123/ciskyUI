import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApprovalComponent } from './manage-approval.component';

describe('ManageApprovalComponent', () => {
  let component: ManageApprovalComponent;
  let fixture: ComponentFixture<ManageApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
