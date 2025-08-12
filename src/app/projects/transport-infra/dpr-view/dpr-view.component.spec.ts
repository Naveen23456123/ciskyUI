import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprViewComponent } from './dpr-view.component';

describe('DprViewComponent', () => {
  let component: DprViewComponent;
  let fixture: ComponentFixture<DprViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DprViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
