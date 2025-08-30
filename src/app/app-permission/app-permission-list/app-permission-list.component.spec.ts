import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPermissionListComponent } from './app-permission-list.component';

describe('AppPermissionListComponent', () => {
  let component: AppPermissionListComponent;
  let fixture: ComponentFixture<AppPermissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPermissionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
