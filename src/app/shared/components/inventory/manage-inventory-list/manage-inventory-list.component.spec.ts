import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInventoryListComponent } from './manage-inventory-list.component';

describe('ManageInventoryListComponent', () => {
  let component: ManageInventoryListComponent;
  let fixture: ComponentFixture<ManageInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageInventoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
