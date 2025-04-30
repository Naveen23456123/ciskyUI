import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApprovalComponent } from './edit-approval.component';

describe('EditApprovalComponent', () => {
  let component: EditApprovalComponent;
  let fixture: ComponentFixture<EditApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
