import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoqContingencyComponent } from './edit-boq-contingency.component';

describe('EditBoqContingencyComponent', () => {
  let component: EditBoqContingencyComponent;
  let fixture: ComponentFixture<EditBoqContingencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBoqContingencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoqContingencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
