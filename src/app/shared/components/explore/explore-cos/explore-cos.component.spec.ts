import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCosComponent } from './explore-cos.component';

describe('ExploreCosComponent', () => {
  let component: ExploreCosComponent;
  let fixture: ComponentFixture<ExploreCosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreCosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreCosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
