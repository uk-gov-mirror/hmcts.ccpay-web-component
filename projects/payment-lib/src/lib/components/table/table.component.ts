import {Component, ViewChild, Input, ChangeDetectorRef} from '@angular/core';
import {PaymentLibComponent} from '../../payment-lib.component';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private paymentLibComponent: PaymentLibComponent,
    private cdRef: ChangeDetectorRef
  ) {}

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
    this.cdRef.detectChanges();
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
  goToRefundProcessComponent(refundReference: string, refundDate: IRefundList ) {
    this.paymentLibComponent.refundlistsource = refundDate;
    this.paymentLibComponent.refundReference = refundReference;
    this.paymentLibComponent.viewName = 'process-refund';
  }
}
