
import {Component, ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort } from '@angular/material/sort';
import {MatPaginator } from '@angular/material/paginator';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'ccpay-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<any>;
  userLst;

  userData = [
    {
      "refundReference": "001",
      "amount": "100",
      "reason": "reason1",
      "status": "SUBMITTED",
      "paymentReference": "RC1",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER1",
      "updateBy": "USER1",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "001",
      "amount": "200",
      "reason": "reason2",
      "status": "SUBMITTED",
      "paymentReference": "RC2",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER2",
      "updateBy": "USER2",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    }, 
    {
      "refundReference": "003",
      "amount": "300",
      "reason": "reason3",
      "status": "SUBMITTED",
      "paymentReference": "RC3",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER3",
      "updateBy": "USER3",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    }, 
    {
      "refundReference": "001",
      "amount": "100",
      "reason": "reason1",
      "status": "SUBMITTED",
      "paymentReference": "RC1",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER1",
      "updateBy": "USER1",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "004",
      "amount": "400",
      "reason": "reason4",
      "status": "SUBMITTED",
      "paymentReference": "RC4",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER4",
      "updateBy": "USER4",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "001",
      "amount": "100",
      "reason": "reason1",
      "status": "SUBMITTED",
      "paymentReference": "RC1",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER1",
      "updateBy": "USER1",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "005",
      "amount": "500",
      "reason": "reason5",
      "status": "SUBMITTED",
      "paymentReference": "RC5",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER5",
      "updateBy": "USER5",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "006",
      "amount": "100",
      "reason": "reason1",
      "status": "SUBMITTED",
      "paymentReference": "RC1",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER1",
      "updateBy": "USER1",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "001",
      "amount": "600",
      "reason": "reason6",
      "status": "SUBMITTED",
      "paymentReference": "RC6",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER6",
      "updateBy": "USER6",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "007",
      "amount": "700",
      "reason": "reason7",
      "status": "SUBMITTED",
      "paymentReference": "RC7",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER7",
      "updateBy": "USER7",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    },
    {
      "refundReference": "008",
      "amount": "800",
      "reason": "reason8",
      "status": "SUBMITTED",
      "paymentReference": "RC8",
      "ccdCaseNumber": "10101010101010101010",
      "createBy": "USER8",
      "updateBy": "USER8",
      "createDate": "2021-07-20T09:12:52.778Z",
      "updateDate": "2021-07-20T09:12:52.778Z"
    }, 
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.userData);
    this.userLst = this.userData.reduce((r,{createBy}) => (r[createBy]='', r) , {});
    //this.userLst = JSON.parse(this.userLst);
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
    //this.selectedSiteName = args.target.options[args.target.selectedIndex].text; 
  } 
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}




/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher aaaaaaa aaaaaaa aaaaaaa ', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
