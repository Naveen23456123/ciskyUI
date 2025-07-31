import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMiscComponent } from './manage-misc.component';

describe('ManageMiscComponent', () => {
  let component: ManageMiscComponent;
  let fixture: ComponentFixture<ManageMiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageMiscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
