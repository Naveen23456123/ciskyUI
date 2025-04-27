import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImperestListComponent } from './imperest-list.component';

describe('ImperestListComponent', () => {
  let component: ImperestListComponent;
  let fixture: ComponentFixture<ImperestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImperestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImperestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
