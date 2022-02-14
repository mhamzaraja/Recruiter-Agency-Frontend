import { TestBed } from '@angular/core/testing';

import { Education.Service.TsService } from './education.service.ts.service';

describe('Education.Service.TsService', () => {
  let service: Education.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Education.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
