import { TestBed } from '@angular/core/testing';

import { NotezExplorerDatabase } from './notez-explorer-database';

describe('NotezExplorerDatabase', () => {
  let service: NotezExplorerDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotezExplorerDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
