import { TestBed } from '@angular/core/testing';

import { ServisiService } from './servisi.service';

describe('ServisiService', () => {
  let service: ServisiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServisiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
