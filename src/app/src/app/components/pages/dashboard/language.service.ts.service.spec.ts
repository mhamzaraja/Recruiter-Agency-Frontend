import { TestBed } from '@angular/core/testing';

import { Language.Service.TsService } from './language.service.ts.service';

describe('Language.Service.TsService', () => {
  let service: Language.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Language.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
