import { OrdersState, OrdersAction } from "./orders.types";

export const OrdersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
  switch (action.type) {
    case 'GET_ORDERS':
      const fetchedOrders = action.payload;
      return {
        ...state,
        orders: fetchedOrders
      }

    case 'ADD_ORDER':
      const newOrder = action.payload;
      const updatedOrders = state.orders.concat(newOrder);
      return {
        ...state,
        orders: updatedOrders
      }

    case 'REMOVE_ORDER':
      const orderNumber = action.payload.orderNumber;
      const updatedOrdersAfterRemove = state.orders.filter(order => order.orderNumber !== orderNumber)
      return {
        ...state,
        orders: updatedOrdersAfterRemove
      }

    case 'CANCEL_ORDER':
      const cancelOrderNumber = action.payload.orderNumber;
      const updatedOrdersAfterCancel = state.orders.map(order => {
        if (order.orderNumber === cancelOrderNumber) {
          return {
            ...order,
            cancelled: true
          }
        }
        return order;
      });
      return {
        ...state,
        orders: updatedOrdersAfterCancel
      }

    case 'RE_ORDER':
      const reOrderNumber = action.payload.orderNumber;
      const updatedOrdersAfterRe = state.orders.map(order => {
        if (order.orderNumber === reOrderNumber) {
          return {
            ...order,
            cancelled: false
          }
        }
        return order;
      });
      return {
        ...state,
        orders: updatedOrdersAfterRe
      }

    default:
      return state;
  }
}
