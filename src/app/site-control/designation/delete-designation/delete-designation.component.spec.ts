import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDesignationComponent } from './delete-designation.component';

describe('DeleteDesignationComponent', () => {
  let component: DeleteDesignationComponent;
  let fixture: ComponentFixture<DeleteDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDesignationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
