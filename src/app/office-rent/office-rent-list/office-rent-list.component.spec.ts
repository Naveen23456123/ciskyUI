import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeRentListComponent } from './office-rent-list.component';

describe('OfficeRentListComponent', () => {
  let component: OfficeRentListComponent;
  let fixture: ComponentFixture<OfficeRentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeRentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeRentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
