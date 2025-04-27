import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRevenueOperationComponent } from './delete-revenue-operation.component';

describe('DeleteRevenueOperationComponent', () => {
  let component: DeleteRevenueOperationComponent;
  let fixture: ComponentFixture<DeleteRevenueOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteRevenueOperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRevenueOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
