import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContingenciesComponent } from './manage-contingencies.component';

describe('ManageContingenciesComponent', () => {
  let component: ManageContingenciesComponent;
  let fixture: ComponentFixture<ManageContingenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageContingenciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageContingenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
