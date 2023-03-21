import { TestBed } from '@angular/core/testing';

import { DialogServiceService } from './dialog-service.service';

describe('DialogServiceService', () => {
  let service: DialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
