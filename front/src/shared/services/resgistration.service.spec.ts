import {TestBed} from '@angular/core/testing';

import {ResgistrationService} from './resgistration.service';

describe('ResgistrationService', () => {
  let service: ResgistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResgistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
