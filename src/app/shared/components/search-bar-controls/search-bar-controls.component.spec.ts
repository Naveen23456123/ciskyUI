import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarControlsComponent } from './search-bar-controls.component';

describe('SearchBarControlsComponent', () => {
  let component: SearchBarControlsComponent;
  let fixture: ComponentFixture<SearchBarControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
