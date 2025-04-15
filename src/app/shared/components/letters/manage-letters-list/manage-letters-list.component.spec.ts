import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLettersListComponent } from './manage-letters-list.component';

describe('LettersListComponent', () => {
  let component: ManageLettersListComponent;
  let fixture: ComponentFixture<ManageLettersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageLettersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLettersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
