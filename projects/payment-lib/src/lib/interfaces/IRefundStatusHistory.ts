import { IRefundStatus } from "./IRefundStatus";

export interface IRefundStatusHistory {
  iRefundStatus: IRefundStatus[]
  lastUpdatedByCurrentUser: boolean
}