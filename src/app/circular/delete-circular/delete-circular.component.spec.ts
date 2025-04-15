import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCircularComponent } from './delete-circular.component';

describe('DeleteCircularComponent', () => {
  let component: DeleteCircularComponent;
  let fixture: ComponentFixture<DeleteCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCircularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
