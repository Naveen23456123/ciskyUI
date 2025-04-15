import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoqContingencyComponent } from './delete-boq-contingency.component';

describe('DeleteBoqContingencyComponent', () => {
  let component: DeleteBoqContingencyComponent;
  let fixture: ComponentFixture<DeleteBoqContingencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBoqContingencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoqContingencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
