import { TestBed } from '@angular/core/testing';

import { SpooncularApiService } from './spooncular-api.service';

describe('SpooncularApiService', () => {
  let service: SpooncularApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpooncularApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
