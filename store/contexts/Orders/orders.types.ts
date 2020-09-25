import { PrepaidItem } from '../Prepaid/prepaid.types';

export type Order = {
  orderNumber: string,
  uid?: string,
  cost?: number,
  currency?: string,
  prepaidItems: PrepaidItem[],
  services: string[],
  completed?: boolean,
  cancelled?: boolean
};

export interface OrdersState {
  orders: Order[];
}

export type FetchOrdersAction = { type: 'FETCH_ORDERS' };
export type GetOrdersAction = { type: 'GET_ORDERS', payload: Order[] };
export type AddOrderAction = { type: 'ADD_ORDER', payload: Order };
export type RemoveOrderAction = { type: 'REMOVE_ORDER', payload: { orderNumber: string } }
export type CancelOrderAction = { type: 'CANCEL_ORDER', payload: { orderNumber: string } }
export type ReOrderAction = { type: 'RE_ORDER', payload: { orderNumber: string } }

export type OrdersAction =
  | FetchOrdersAction
  | GetOrdersAction
  | AddOrderAction
  | RemoveOrderAction
  | CancelOrderAction
  | ReOrderAction;

export type OrdersDispatch = (action: OrdersAction) => any;
