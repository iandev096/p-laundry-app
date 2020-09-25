import { User, firestore, auth } from "firebase";
import { OrdersDispatch, Order, GetOrdersAction, OrdersAction, AddOrderAction, RemoveOrderAction, CancelOrderAction, ReOrderAction } from "./orders.types";

const ordersColRef = 'orders';

async function fetchOrdersCase(user: User, dispatch: OrdersDispatch) {
  try {
    const ordersRef = firestore().collection(ordersColRef);
    const ordersSnapshot = await ordersRef.where('uid', '==', user.uid).get();

    const fetchedOrders: Order[] = [];
    ordersSnapshot.forEach((doc) => {
      fetchedOrders.push({
        orderNumber: doc.data()?.orderNumber,
        prepaidItems: doc.data()?.prepaidItems,
        services: doc.data()?.services,
        uid: doc.data()?.uid,
        cancelled: doc.data()?.cancelled,
        completed: doc.data()?.completed,
        currency: doc.data()?.currency,
        cost: doc.data()?.cost,
      });
    });

    if (fetchedOrders.length > 0) {
      const dispatchAction: GetOrdersAction = {
        type: 'GET_ORDERS',
        payload: fetchedOrders
      }
      return dispatch(dispatchAction);
    } else {
      // throw new Error('Orders not found');
    }
  } catch (err) {
    throw new Error(err.message ?? 'Error fetching orders');
  }
}

async function addOrderCase(user: User, action: AddOrderAction, dispatch: OrdersDispatch) {
  const orderNumber = action.payload.orderNumber;
  try {
    const dispatchedActionPayload = {
      canCancel: true,
      cancelled: false,
      completed: false,
      currency: 'GHC',
      orderNumber: action.payload.orderNumber,
      prepaidItems: action.payload.prepaidItems,
      services: action.payload.services,
      uid: user.uid,
    }
    await firestore()
      .collection(ordersColRef)
      .doc(orderNumber)
      .set(dispatchedActionPayload);

    action.payload = dispatchedActionPayload;
    return dispatch(action);
  } catch (err) {
    throw new Error(err.message ?? 'Error adding order');
  }
}

async function cancelOrderCase(action: CancelOrderAction, dispatch: OrdersDispatch) {
  const orderNumber = action.payload.orderNumber;
  try {
    await firestore()
      .collection(ordersColRef)
      .doc(orderNumber)
      .set({
        cancelled: true
      }, {
        merge: true
      });
  } catch (err) {
    throw new Error(err.message ?? 'Error cancelling order');
  }
}

async function reOrderCase(action: ReOrderAction, dispatch: OrdersDispatch) {
  const orderNumber = action.payload.orderNumber;
  try {
    await firestore()
      .collection(ordersColRef)
      .doc(orderNumber)
      .set({
        cancelled: false
      }, {
        merge: true
      });
  } catch (err) {
    throw new Error(err.message ?? 'Error re-ordering order');
  }
}

async function removeOrderCase(user: User, action: RemoveOrderAction, dispatch: OrdersDispatch) {
  const orderNumber = action.payload.orderNumber;
  try {
    await firestore()
      .collection(ordersColRef)
      .doc(orderNumber)
      .delete();
    return dispatch(action);
  } catch (err) {
    throw new Error(err.message ?? 'Error removing order');
  }
}

export const OrdersDispatchMiddleware = (dispatch: OrdersDispatch) => {
  const user = auth().currentUser;
  if (user) {
    return (action: OrdersAction) => {
      switch (action.type) {
        case 'FETCH_ORDERS':
          return fetchOrdersCase(user, dispatch)
            .then()
            .catch(err => { throw err });

        case 'ADD_ORDER':
          return addOrderCase(user, action, dispatch)
            .then()
            .catch(err => { throw err });

        case 'REMOVE_ORDER':
          return removeOrderCase(user, action, dispatch)
            .then()
            .catch(err => { throw err });

        case 'CANCEL_ORDER':
          return cancelOrderCase(action, dispatch)
            .then()
            .catch(err => { throw err });

        case 'RE_ORDER':
          return reOrderCase(action, dispatch)
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