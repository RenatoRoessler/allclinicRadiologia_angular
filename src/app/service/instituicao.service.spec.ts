import { TestBed } from '@angular/core/testing';

import { InstituicaoService } from './instituicao.service';

describe('InstituicaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstituicaoService = TestBed.get(InstituicaoService);
    expect(service).toBeTruthy();
  });
});
