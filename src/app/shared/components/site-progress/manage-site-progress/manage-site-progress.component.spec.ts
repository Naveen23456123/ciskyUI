import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSiteProgressComponent } from './manage-site-progress.component';

describe('ManageSiteProgressComponent', () => {
  let component: ManageSiteProgressComponent;
  let fixture: ComponentFixture<ManageSiteProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSiteProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSiteProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
