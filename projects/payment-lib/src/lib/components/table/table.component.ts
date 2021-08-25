import {Component, ViewChild, Input} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort } from '@angular/material/sort';
import {MatPaginator } from '@angular/material/paginator';
import { IRefundList } from '../../interfaces/IRefundList';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ccpay-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input('DATASOURCE') DATASOURCE: any[];
  @Input('STATUS') STATUS: string;
  @Input('errorMessage') errorMessage: string;
  isApprovalFlow: boolean;
  
  displayedColumns = ['ccdCaseNumber', 'refundReference', 'reason', 'createBy', 'updateDate', 'Action'];
  dataSource: MatTableDataSource<any>;
  userLst;
  actualcount: number;
  count: number;
  refundList: IRefundList[];

  usersData = [
    {
      "refund_reference": "RF-1324-6846-2454-5445",
      "amount": "100",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "payment_reference": "RC1",
      "ccd_case_number": "1010-1010-1010-1010",
      "user_full_name": "USER1 USER1",
      "updateBy": "USER1",
      "date_created": "2021-07-20T09:12:52.778Z",
      "date_updated": "2021-07-20T09:12:52.778Z"
    },
    {
      "refund_reference": "RF-1324-6846-2454-5446",
      "amount": "200",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "payment_reference": "RC2",
      "ccd_case_number": "1010-1010-1010-1010",
      "user_full_name": "USER2 USER2",
      "updateBy": "USER2",
      "date_created": "2021-07-20T09:12:52.778Z",
      "date_updated": "2021-07-20T09:12:52.778Z"
    }, 
    {
      "refund_reference": "RF-1324-6846-2454-5447",
      "amount": "300",
      "reason": "reason3 hhhh hhh hhh hhh hhhh",
      "status": "SUBMITTED",
      "payment_reference": "RC3",
      "ccd_case_number": "1010-1010-1010-1010",
      "user_full_name": "USER3 USER3",
      "updateBy": "USER3",
      "date_created": "2021-07-20T09:12:52.778Z",
      "date_updated": "2021-07-20T09:12:52.778Z"
    }, 
    {
      "refund_reference": "RF-1324-6846-2454-5448",
      "amount": "400",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "payment_reference": "RC4",
      "ccd_case_number": "1010-1010-1010-1010",
      "user_full_name": "USER4 USER4",
      "updateBy": "USER4",
      "date_created": "2021-07-20T09:12:52.778Z",
      "date_updated": "2021-07-20T09:12:52.778Z"
    },
 
    {
      "refund_reference": "RF-1324-6846-2454-5449",
      "amount": "500",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "payment_reference": "RC5",
      "ccd_case_number": "1010-1010-1010-1010",
      "user_full_name": "USER5 USER5",
      "updateBy": "USER5",
      "date_created": "2021-07-20T09:12:52.778Z",
      "date_updated": "2021-07-20T09:12:52.778Z"
    },
    {
      "refund_reference": "RF-1324-6846-2454-5450",
      "amount": "600",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "payment_reference": "RC6",
      "ccd_case_number": "1010-1010-1010-1010",
      "user_full_name": "USER6 USER6",
      "updateBy": "USER6",
      "date_created": "2021-07-20T09:12:52.778Z",
      "date_updated": "2021-07-20T09:12:52.778Z"
    },
    {
      "refund_reference": "RF-1324-6846-2454-5451",
      "amount": "700",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "payment_reference": "RC7",
      "ccd_case_number": "1010-1010-1010-1010",
      "user_full_name": "USER7 USER7",
      "updateBy": "USER7",
      "date_created": "2021-07-20T09:12:52.778Z",
      "date_updated": "2021-07-20T09:12:52.778Z"
    },
    {
      "refund_reference": "RF-1324-6846-2454-5452",
      "amount": "800",
      "reason": "Case Withdrawn",
      "status": "SUBMITTED",
      "payment_reference": "RC8",
      "ccd_case_number": "1010-1010-1010-1010",
      "user_full_name": "USER8 USER8",
      "updateBy": "USER8",
      "date_created": "2021-07-20T09:12:52.778Z",
      "date_updated": "2021-07-20T09:12:52.778Z"
    }
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  

    // Assign the data to the data source for the table to render
   //  this.dataSource = new MatTableDataSource(this.usersData);
    // this.dataSource = new MatTableDataSource(this.refundList);
    // this.actualcount = this.dataSource.data.length;
    // if( this.refundList !== undefined) {
    // this.userLst = this.refundList.reduce((r,{user_full_name}) => (r[user_full_name]='', r) , {});
    //  this.userLst = Object.keys(this.userLst);
    // }
  }

  ngOnInit() { 
    this.errorMessage = this.errorMessage;
    if(this.STATUS.toLowerCase() === 'sent for approval') {
      this.isApprovalFlow = true;
    } else {
    this.isApprovalFlow = false;
    }
    this.refundList = this.DATASOURCE;
    this.dataSource = new MatTableDataSource(this.refundList);
    this.actualcount = this.dataSource.data.length;
    if( this.refundList !== undefined) {
    this.userLst = this.refundList.reduce((r,{user_full_name}) => (r[user_full_name]='', r) , {});
     this.userLst = Object.keys(this.userLst);
    }
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
