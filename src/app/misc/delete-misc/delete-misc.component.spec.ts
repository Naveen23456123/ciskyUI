import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMiscComponent } from './delete-misc.component';

describe('DeleteMiscComponent', () => {
  let component: DeleteMiscComponent;
  let fixture: ComponentFixture<DeleteMiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteMiscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
