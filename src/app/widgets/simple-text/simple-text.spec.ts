import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleText } from './simple-text';

describe('SimpleText', () => {
  let component: SimpleText;
  let fixture: ComponentFixture<SimpleText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
