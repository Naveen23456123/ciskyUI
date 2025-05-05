import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSiteProgressComponent } from './explore-site-progress.component';

describe('ExploreSiteProgressComponent', () => {
  let component: ExploreSiteProgressComponent;
  let fixture: ComponentFixture<ExploreSiteProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreSiteProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreSiteProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
