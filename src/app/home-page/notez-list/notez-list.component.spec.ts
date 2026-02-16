import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotezListComponent } from './notez-list.component';

describe('NotezListComponent', () => {
  let component: NotezListComponent;
  let fixture: ComponentFixture<NotezListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotezListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotezListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
