import { Injectable } from '@angular/core';

import { ICase } from '../../interfaces/ICase';
import { CASES } from '../../components/case-list/mock-case-data';

@Injectable({
  providedIn: 'root'
})
export class CaseListService {

  constructor() { }

  getCases(): ICase[] {
    return CASES;
  }
}
