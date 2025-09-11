import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ICase } from '../../interfaces/ICase';
import { CASES } from './mock-case-data';

@Component({
    selector: 'app-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.css'],
    standalone: true,
    imports: [CommonModule, RouterLink]
})
export class CaseListComponent implements OnInit {
  pageTitle: string = 'Case list';
  cases: ICase[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.cases = CASES;
  }

}
