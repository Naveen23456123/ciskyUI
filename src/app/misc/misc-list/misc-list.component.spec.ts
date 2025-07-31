import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscListComponent } from './misc-list.component';

describe('MiscListComponent', () => {
  let component: MiscListComponent;
  let fixture: ComponentFixture<MiscListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiscListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
