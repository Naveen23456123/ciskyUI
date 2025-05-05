import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreEotComponent } from './explore-eot.component';

describe('ExploreEotComponent', () => {
  let component: ExploreEotComponent;
  let fixture: ComponentFixture<ExploreEotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreEotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreEotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
