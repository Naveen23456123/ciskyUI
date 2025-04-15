import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoqContingencyComponent } from './add-boq-contingency.component';

describe('AddBoqContingencyComponent', () => {
  let component: AddBoqContingencyComponent;
  let fixture: ComponentFixture<AddBoqContingencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBoqContingencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoqContingencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
