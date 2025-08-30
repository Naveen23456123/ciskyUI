import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDprBoqListComponent } from './manage-dpr-boq-list.component';

describe('ManageDprBoqListComponent', () => {
  let component: ManageDprBoqListComponent;
  let fixture: ComponentFixture<ManageDprBoqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDprBoqListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDprBoqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
