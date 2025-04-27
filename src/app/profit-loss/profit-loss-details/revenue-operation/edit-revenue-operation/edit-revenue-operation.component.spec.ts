import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRevenueOperationComponent } from './edit-revenue-operation.component';

describe('EditRevenueOperationComponent', () => {
  let component: EditRevenueOperationComponent;
  let fixture: ComponentFixture<EditRevenueOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRevenueOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRevenueOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
