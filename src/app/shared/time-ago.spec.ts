import { TestBed } from '@angular/core/testing';

import { TimeAgo } from './time-ago';

describe('TimeAgo', () => {
  let service: TimeAgo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeAgo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
