import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCosComponent } from './manage-cos.component';

describe('ManageCosComponent', () => {
  let component: ManageCosComponent;
  let fixture: ComponentFixture<ManageCosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
