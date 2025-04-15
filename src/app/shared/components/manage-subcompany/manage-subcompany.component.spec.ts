import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubcompanyComponent } from './manage-subcompany.component';

describe('ManageSubcompanyComponent', () => {
  let component: ManageSubcompanyComponent;
  let fixture: ComponentFixture<ManageSubcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSubcompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
