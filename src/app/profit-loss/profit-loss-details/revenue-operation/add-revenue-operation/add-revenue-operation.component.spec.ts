import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevenueOperationComponent } from './add-revenue-operation.component';

describe('AddRevenueOperationComponent', () => {
  let component: AddRevenueOperationComponent;
  let fixture: ComponentFixture<AddRevenueOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRevenueOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRevenueOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
