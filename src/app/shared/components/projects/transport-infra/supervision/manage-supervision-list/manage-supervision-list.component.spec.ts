import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupervisionListComponent } from './manage-supervision-list.component';

describe('ManageSupervisionListComponent', () => {
  let component: ManageSupervisionListComponent;
  let fixture: ComponentFixture<ManageSupervisionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSupervisionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupervisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
