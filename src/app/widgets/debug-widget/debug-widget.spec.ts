import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugWidget } from './debug-widget';

describe('DebugWidget', () => {
  let component: DebugWidget;
  let fixture: ComponentFixture<DebugWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebugWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebugWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
