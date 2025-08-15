import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkGlitchComponent } from './network-glitch.component';

describe('NetworkGlitchComponent', () => {
  let component: NetworkGlitchComponent;
  let fixture: ComponentFixture<NetworkGlitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkGlitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkGlitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
