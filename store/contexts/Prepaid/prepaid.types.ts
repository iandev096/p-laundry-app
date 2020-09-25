export type PrepaidItem = {
  headline: string,
  quantity?: number,
  label: 'gold' | 'silver' | 'bronze',
}
export type UserPrepaidItems = {
  gold?: PrepaidItem,
  silver?: PrepaidItem,
  bronze?: PrepaidItem,
}
export interface PrepaidState {
  gold: PrepaidItem,
  silver: PrepaidItem,
  bronze: PrepaidItem,
  user: UserPrepaidItems
}

export type FetchPrepaidItemsAction = { type: 'FETCH_PREPAID_ITEMS' };
export type GetPrepaidItemsAction = { type: 'GET_PREPAID_ITEMS', payload: PrepaidItem[] };

export type FetchUserPrepaidItemsAction = { type: 'FETCH_USER_PREPAID_ITEMS' };
export type GetUserPrepaidItemsAction = { type: 'GET_USER_PREPAID_ITEMS', payload: PrepaidItem[] };
export type FetchUserPrepaidItemAction = { type: 'FETCH_USER_PREPAID_ITEM', payload: { label: string } };
export type GetUserPrepaidItemAction = { type: 'GET_USER_PREPAID_ITEM', payload: PrepaidItem };

export type PrepaidAction =
  | FetchPrepaidItemsAction
  | GetPrepaidItemsAction

  | FetchUserPrepaidItemsAction
  | GetUserPrepaidItemsAction

  | FetchUserPrepaidItemAction
  | GetUserPrepaidItemAction;

export type PrepaidDispatch = (action: PrepaidAction) => any;
