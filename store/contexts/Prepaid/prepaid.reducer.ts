import { PrepaidState, PrepaidAction, PrepaidItem } from "./prepaid.types";

export const PrepaidReducer = (state: PrepaidState, action: PrepaidAction): PrepaidState => {
  switch (action.type) {
    case 'GET_PREPAID_ITEMS':
      const fetchedPrepaidItems = action.payload;
      const fetchedGold = fetchedPrepaidItems.find(item => item.label === 'gold') as PrepaidItem;
      const fetchedSilver = fetchedPrepaidItems.find(item => item.label === 'silver') as PrepaidItem;
      const fetchedBronze = fetchedPrepaidItems.find(item => item.label === 'bronze') as PrepaidItem;
      return {
        ...state,
        gold: fetchedGold,
        silver: fetchedSilver,
        bronze: fetchedBronze
      };

    case 'GET_USER_PREPAID_ITEMS':
      const fetchedUserPrepaidItems = action.payload;
      const fetchedUserGold = fetchedUserPrepaidItems.find(item => item.label === 'gold') as PrepaidItem;
      const fetchedUserSilver = fetchedUserPrepaidItems.find(item => item.label === 'silver') as PrepaidItem;
      const fetchedUserBronze = fetchedUserPrepaidItems.find(item => item.label === 'bronze') as PrepaidItem;
      return {
        ...state,
        user: {
          gold: fetchedUserGold,
          silver: fetchedUserSilver,
          bronze: fetchedUserBronze
        }
      };

    case 'GET_USER_PREPAID_ITEM':
      const purchasedItem = action.payload;
      return {
        ...state,
        user: {
          [purchasedItem.label]: purchasedItem
        }
      }

    default:
      return state;
  }
}