import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprCreateComponent } from './dpr-create.component';

describe('DprCreateComponent', () => {
  let component: DprCreateComponent;
  let fixture: ComponentFixture<DprCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DprCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
