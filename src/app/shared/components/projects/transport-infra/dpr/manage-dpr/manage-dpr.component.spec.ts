import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDprComponent } from './manage-dpr.component';

describe('ManageDprComponent', () => {
  let component: ManageDprComponent;
  let fixture: ComponentFixture<ManageDprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDprComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
