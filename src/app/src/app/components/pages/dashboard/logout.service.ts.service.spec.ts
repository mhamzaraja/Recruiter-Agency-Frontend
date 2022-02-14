import { TestBed } from '@angular/core/testing';

import { Logout.Service.TsService } from './logout.service.ts.service';

describe('Logout.Service.TsService', () => {
  let service: Logout.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Logout.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
