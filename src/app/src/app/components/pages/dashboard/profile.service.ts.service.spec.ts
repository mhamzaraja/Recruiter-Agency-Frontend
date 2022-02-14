import { TestBed } from '@angular/core/testing';

import { Profile.Service.TsService } from './profile.service.ts.service';

describe('Profile.Service.TsService', () => {
  let service: Profile.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Profile.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
