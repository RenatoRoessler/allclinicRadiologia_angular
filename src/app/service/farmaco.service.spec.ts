import { TestBed } from '@angular/core/testing';

import { FarmacoService } from './farmaco.service';

describe('FarmacoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmacoService = TestBed.get(FarmacoService);
    expect(service).toBeTruthy();
  });
});
