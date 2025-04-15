import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EotListComponent } from './eot-list.component';

describe('EotListComponent', () => {
  let component: EotListComponent;
  let fixture: ComponentFixture<EotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EotListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
