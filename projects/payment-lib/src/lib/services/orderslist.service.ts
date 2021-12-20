import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {IOrderReferenceFee} from '../interfaces/IOrderReferenceFee';
import { IRefundList } from '../interfaces/IRefundList';
import { IPaymentView } from '../interfaces/IPaymentView';  

@Injectable({
  providedIn: 'root'
})
export class OrderslistService {
  private ordersList: BehaviorSubject<IOrderReferenceFee[]> = new BehaviorSubject<IOrderReferenceFee[]>(null);
  private refundView: BehaviorSubject<IRefundList> = new BehaviorSubject<IRefundList>(null);
  private caseType = new BehaviorSubject("");
  getcaseType = this.caseType.asObservable();
  private feeExists = new BehaviorSubject<boolean>(null);
  getFeeExist = this.feeExists.asObservable();
  private ccdCaseNumber = new BehaviorSubject("");
  getCCDCaseNumberforRefund = this.ccdCaseNumber.asObservable();
  private isFromServiceRequestPage = new BehaviorSubject<boolean>(null);
  getisFromServiceRequestPage = this.isFromServiceRequestPage.asObservable();
  private OrderRefId = new BehaviorSubject("");
  getOrderRefId = this.OrderRefId.asObservable();
  private navigationPage = new BehaviorSubject("");
  getnavigationPage = this.navigationPage.asObservable();
  private rolesList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

  private paymentPageView: BehaviorSubject<IPaymentView> = new BehaviorSubject<IPaymentView>(null);

  constructor() { }

  setOrdersList(orderLevelFees: IOrderReferenceFee[]): void {
    this.ordersList.next(Object.assign([], orderLevelFees));
  }
  getOrdersList() {
    return this.ordersList;
  }

  setRefundView(refundList: IRefundList): void {
    this.refundView.next(Object.assign([], refundList));
  }
  getRefundView() {
    return this.refundView;
  }

  setCaseType(caseType: string){
    this.caseType.next(caseType);
  }
  getCaseType(){
    return this.caseType;
  }

  setCCDCaseNumber(ccdCaseNumber: string){
    this.ccdCaseNumber.next(ccdCaseNumber);
  }
  getCCDCaseNumber(){
    return this.ccdCaseNumber;
  }

  setFeeExists(feeExists: boolean){
    this.feeExists.next(feeExists);
  }
  getFeeExists(){
    return this.feeExists;
  } 

  setisFromServiceRequestPage(isFromServiceRequestPage: boolean){
    this.isFromServiceRequestPage.next(isFromServiceRequestPage);
  }
  getisFromServiceRequestPages(){
    return this.isFromServiceRequestPage;
  }

  setOrderRefId(OrderRefId: string){
    this.OrderRefId.next(OrderRefId);
  }
  getSelectedOrderRefId(){
    return this.OrderRefId;
  }

  setnavigationPage(navigationPage: string){
    this.navigationPage.next(navigationPage);
  }
  getnavigationPageValue(){
    return this.navigationPage;
  }

  setpaymentPageView(paymentpageList: IPaymentView): void {
    this.paymentPageView.next(Object.assign([], paymentpageList));
  }
  getpaymentPageView() {
    return this.paymentPageView;
  }

  setUserRolesList(rolesList:any[]): void {
    this.rolesList.next(Object.assign([], rolesList));
  }
  getUserRolesList() {
    return this.rolesList;
  }
}
