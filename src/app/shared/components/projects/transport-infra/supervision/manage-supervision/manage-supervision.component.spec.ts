import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupervisionComponent } from './manage-supervision.component';

describe('ManageSupervisionComponent', () => {
  let component: ManageSupervisionComponent;
  let fixture: ComponentFixture<ManageSupervisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSupervisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
