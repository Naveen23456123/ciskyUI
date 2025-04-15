import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqContingencyListComponent } from './boq-contingency-list.component';

describe('BoqContingencyListComponent', () => {
  let component: BoqContingencyListComponent;
  let fixture: ComponentFixture<BoqContingencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoqContingencyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoqContingencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
