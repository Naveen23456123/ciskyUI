import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumComponent } from './bread-crum.component';

describe('BreadCrumComponent', () => {
  let component: BreadCrumComponent;
  let fixture: ComponentFixture<BreadCrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadCrumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadCrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
