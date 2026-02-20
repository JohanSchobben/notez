import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWidget } from './base-widget';

describe('BaseWidget', () => {
  let component: BaseWidget;
  let fixture: ComponentFixture<BaseWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
