import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreLettersComponent } from './explore-letters.component';

describe('ExploreLettersComponent', () => {
  let component: ExploreLettersComponent;
  let fixture: ComponentFixture<ExploreLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreLettersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
