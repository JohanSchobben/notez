import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotezView } from './notez-view';

describe('NotezView', () => {
  let component: NotezView;
  let fixture: ComponentFixture<NotezView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotezView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotezView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
