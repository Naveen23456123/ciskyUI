import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConOfcRentListComponent } from './con-ofc-rent-list.component';

describe('ConOfcRentListComponent', () => {
  let component: ConOfcRentListComponent;
  let fixture: ComponentFixture<ConOfcRentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConOfcRentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConOfcRentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
