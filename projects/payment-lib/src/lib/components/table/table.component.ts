import {Component, ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort } from '@angular/material/sort';
import {MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'ccpay-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns = ['ccdCaseNumber', 'refundReference', 'reason', 'createBy', 'updateDate', 'Action'];
  dataSource: MatTableDataSource<any>;
  userLst;
  actualcount: number;
  count: number;

  usersData = [
    {
      "refundReference": "RF-1324-6846-2454-5445",
      "amount": "100",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "paymentReference": "RC1",
      "ccdCaseNumber": "1010-1010-1010-1010",
      "createBy": "USER1 USER1",
      "updateBy": "USER1",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "RF-1324-6846-2454-5446",
      "amount": "200",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "paymentReference": "RC2",
      "ccdCaseNumber": "1010-1010-1010-1010",
      "createBy": "USER2 USER2",
      "updateBy": "USER2",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    }, 
    {
      "refundReference": "RF-1324-6846-2454-5447",
      "amount": "300",
      "reason": "reason3 hhhh hhh hhh hhh hhhh",
      "status": "SUBMITTED",
      "paymentReference": "RC3",
      "ccdCaseNumber": "1010-1010-1010-1010",
      "createBy": "USER3 USER3",
      "updateBy": "USER3",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    }, 
    {
      "refundReference": "RF-1324-6846-2454-5448",
      "amount": "400",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "paymentReference": "RC4",
      "ccdCaseNumber": "1010-1010-1010-1010",
      "createBy": "USER4 USER4",
      "updateBy": "USER4",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
 
    {
      "refundReference": "RF-1324-6846-2454-5449",
      "amount": "500",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "paymentReference": "RC5",
      "ccdCaseNumber": "1010-1010-1010-1010",
      "createBy": "USER5 USER5",
      "updateBy": "USER5",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "RF-1324-6846-2454-5450",
      "amount": "600",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "paymentReference": "RC6",
      "ccdCaseNumber": "1010-1010-1010-1010",
      "createBy": "USER6 USER6",
      "updateBy": "USER6",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "RF-1324-6846-2454-5451",
      "amount": "700",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "paymentReference": "RC7",
      "ccdCaseNumber": "1010-1010-1010-1010",
      "createBy": "USER7 USER7",
      "updateBy": "USER7",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "RF-1324-6846-2454-5452",
      "amount": "800",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "paymentReference": "RC8",
      "ccdCaseNumber": "1010-1010-1010-1010",
      "createBy": "USER8 USER8",
      "updateBy": "USER8",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    }
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.usersData);
    this.actualcount = this.dataSource.data.length;
    this.userLst = this.usersData.reduce((r,{createBy}) => (r[createBy]='', r) , {});
     this.userLst = Object.keys(this.userLst);
  }

  
  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectchange(args){ 
    this.dataSource.filter = args.target.value;
    this.actualcount = this.dataSource.data.length;
  } 
}


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
