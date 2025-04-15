import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSiteInventoryComponent } from './manage-site-inventory.component';

describe('ManageSiteInventoryComponent', () => {
  let component: ManageSiteInventoryComponent;
  let fixture: ComponentFixture<ManageSiteInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSiteInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSiteInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
