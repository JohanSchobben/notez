import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotezControl } from './notez-control';

describe('NotezControl', () => {
  let component: NotezControl;
  let fixture: ComponentFixture<NotezControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotezControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotezControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
