import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTextComponent } from './notification-text.component';

describe('NotificationTextComponent', () => {
  let component: NotificationTextComponent;
  let fixture: ComponentFixture<NotificationTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
