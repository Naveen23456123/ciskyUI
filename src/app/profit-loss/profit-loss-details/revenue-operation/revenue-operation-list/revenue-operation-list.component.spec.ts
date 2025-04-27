import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueOperationListComponent } from './revenue-operation-list.component';

describe('RevenueOperationListComponent', () => {
  let component: RevenueOperationListComponent;
  let fixture: ComponentFixture<RevenueOperationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevenueOperationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
