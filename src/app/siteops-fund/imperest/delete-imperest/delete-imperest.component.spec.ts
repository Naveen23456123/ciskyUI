import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImperestComponent } from './delete-imperest.component';

describe('DeleteImperestComponent', () => {
  let component: DeleteImperestComponent;
  let fixture: ComponentFixture<DeleteImperestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteImperestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteImperestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
