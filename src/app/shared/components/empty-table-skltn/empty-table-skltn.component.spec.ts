import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTableSkltnComponent } from './empty-table-skltn.component';

describe('EmptyTableSkltnComponent', () => {
  let component: EmptyTableSkltnComponent;
  let fixture: ComponentFixture<EmptyTableSkltnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyTableSkltnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTableSkltnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
