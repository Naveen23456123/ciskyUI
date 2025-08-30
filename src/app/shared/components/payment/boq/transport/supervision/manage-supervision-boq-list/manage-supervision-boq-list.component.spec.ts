import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupervisionBoqListComponent } from './manage-supervision-boq-list.component';

describe('ManageSupervisionBoqListComponent', () => {
  let component: ManageSupervisionBoqListComponent;
  let fixture: ComponentFixture<ManageSupervisionBoqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSupervisionBoqListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupervisionBoqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
