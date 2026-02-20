import { TestBed } from '@angular/core/testing';

import { WidgetDatabase } from './widget-database';

describe('WidgetDatabase', () => {
  let service: WidgetDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
