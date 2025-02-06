import { TestBed } from '@angular/core/testing';

import { IelcapiService } from './ielcapi.service';

describe('IelcapiService', () => {
  let service: IelcapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IelcapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
