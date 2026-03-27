import { TestBed } from '@angular/core/testing';

import { NotezDialog } from './notez-dialog.service';

describe('Dialog', () => {
  let service: NotezDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotezDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
