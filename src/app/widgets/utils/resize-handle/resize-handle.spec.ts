import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeHandle } from './resize-handle';

describe('ResizeHandle', () => {
  let component: ResizeHandle;
  let fixture: ComponentFixture<ResizeHandle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizeHandle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizeHandle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
