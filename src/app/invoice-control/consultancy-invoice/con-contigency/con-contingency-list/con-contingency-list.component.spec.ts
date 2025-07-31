import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConContingencyListComponent } from './con-contingency-list.component';

describe('ConContingencyListComponent', () => {
  let component: ConContingencyListComponent;
  let fixture: ComponentFixture<ConContingencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConContingencyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConContingencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
