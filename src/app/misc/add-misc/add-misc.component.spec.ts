import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMiscComponent } from './add-misc.component';

describe('AddMiscComponent', () => {
  let component: AddMiscComponent;
  let fixture: ComponentFixture<AddMiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMiscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
