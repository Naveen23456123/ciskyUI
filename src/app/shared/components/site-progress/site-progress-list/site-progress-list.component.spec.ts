import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteProgressListComponent } from './site-progress-list.component';

describe('SiteProgressListComponent', () => {
  let component: SiteProgressListComponent;
  let fixture: ComponentFixture<SiteProgressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteProgressListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteProgressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
