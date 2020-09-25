import { PrepaidDispatch, PrepaidAction, PrepaidItem, GetPrepaidItemsAction, GetUserPrepaidItemAction, GetUserPrepaidItemsAction, FetchUserPrepaidItemAction } from "./prepaid.types";
import { firestore, auth, User } from 'firebase';

const usersColRef = 'users';
const prepaidItemsColRef = 'prepaidItems';

async function fetchPrepaidItemsCase(dispatch: PrepaidDispatch) {
  try {
    const fetchedPrepaidItemsSnapshot = await firestore()
      .collection(prepaidItemsColRef)
      .get();

    const fetchedPrepaidItems: PrepaidItem[] = [];
    fetchedPrepaidItemsSnapshot.forEach(doc => {
      fetchedPrepaidItems.push({
        headline: doc.data()?.headline,
        label: doc.data()?.label
      });
    })

    if (fetchedPrepaidItems.length > 0) {
      const dispatchAction: GetPrepaidItemsAction = {
        type: 'GET_PREPAID_ITEMS',
        payload: fetchedPrepaidItems
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Prepaid items not found')
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching prepaid items');
  }
}

async function fetchUserPrepaidItemsCase(user: User, dispatch: PrepaidDispatch) {
  try {
    const fetchedUserPrepaidItemsSnapshot = await firestore()
      .collection(usersColRef)
      .doc(user.uid)
      .collection(prepaidItemsColRef)
      .get();

    const fetchedUserPrepaidItems: PrepaidItem[] = [];
    fetchedUserPrepaidItemsSnapshot.forEach(doc => {
      fetchedUserPrepaidItems.push({
        headline: doc.data()?.headline,
        label: doc.data()?.label,
        quantity: doc.data()?.quantity
      });
    })

    if (fetchedUserPrepaidItems.length > 0) {
      const dispatchAction: GetUserPrepaidItemsAction = {
        type: 'GET_USER_PREPAID_ITEMS',
        payload: fetchedUserPrepaidItems
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Prepaid items not found')
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching user prepaid items');
  }
}

async function fetchUserPrepaidItemCase(user: User, dispatch: PrepaidDispatch, action: FetchUserPrepaidItemAction) {
  try {
    const fetchedUserPrepaidItemsDoc = await firestore()
      .collection(usersColRef)
      .doc(user.uid)
      .collection(prepaidItemsColRef)
      .doc(action.payload.label)
      .get();

    if (fetchedUserPrepaidItemsDoc.exists) {
      const dispatchAction: GetUserPrepaidItemAction = {
        type: 'GET_USER_PREPAID_ITEM',
        payload: {
          headline: fetchedUserPrepaidItemsDoc.data()?.headline,
          label: fetchedUserPrepaidItemsDoc.data()?.label,
          quantity: fetchedUserPrepaidItemsDoc.data()?.quantity
        }
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Prepaid item not found')
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching user prepaid item');
  }
}

export const PrepaidDispatchMiddleware = (dispatch: PrepaidDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: PrepaidAction) => {
      switch (action.type) {
        case 'FETCH_PREPAID_ITEMS':
          return fetchPrepaidItemsCase(dispatch)
            .then()
            .catch(err => { throw err });

        case 'FETCH_USER_PREPAID_ITEMS':
          return fetchUserPrepaidItemsCase(user, dispatch)
            .then()
            .catch(err => { throw err });

        case 'FETCH_USER_PREPAID_ITEM':
          return fetchUserPrepaidItemCase(user, dispatch, action)
            .then()
            .catch(err => { throw err });

        default:
          return dispatch(action);
      }
    }
  } else {
    throw new Error('User not authenticated');
  }
}
