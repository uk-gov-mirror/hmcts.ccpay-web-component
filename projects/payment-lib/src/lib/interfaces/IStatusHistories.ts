import { IStatusHistory } from './IStatusHistory'

export interface IStatusHistories {
  amount: number;
  reference: string;
  status: string;
  status_histories: IStatusHistory[];
}
