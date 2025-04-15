import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderUiComponent } from './placeholder-ui.component';

describe('PlaceholderUiComponent', () => {
  let component: PlaceholderUiComponent;
  let fixture: ComponentFixture<PlaceholderUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceholderUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
