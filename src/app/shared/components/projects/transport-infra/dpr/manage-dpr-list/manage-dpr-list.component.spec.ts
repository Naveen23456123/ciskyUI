import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDprListComponent } from './manage-dpr-list.component';

describe('ManageDprListComponent', () => {
  let component: ManageDprListComponent;
  let fixture: ComponentFixture<ManageDprListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDprListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDprListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
