import { Component, OnInit } from '@angular/core';

import { CaseListService } from '../../services/case-list/case-list.service';
import { ICase } from '../../interfaces/ICase';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {

  pageTitle: string = 'Case list';
  cases: ICase[];

  constructor(private caseListSerivce: CaseListService) { }

  ngOnInit() {
    this.cases = this.caseListSerivce.getCases();
  }

}
