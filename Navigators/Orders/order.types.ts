import { RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs'

export type OrderTabsParamList = {
  ActiveOrders: {
    mode: 'active'
  },
  CompletedOrders: {
    mode: 'completed'
  },
  CancelledOrders: {
    mode: 'cancelled'
  }
}

export type PrepaidItemLabel = 'gold' | 'silver' | 'bronze' | 'none';
export type PrepaidItem = { label: PrepaidItemLabel, headline: string, quantity: number };
export type Order = { 
  orderNumber: string, 
  prepaidItems: PrepaidItem[], 
  services: string[],
  completed?: boolean,
  cancelled?: boolean
};

export type OrderRouteProp<T extends keyof OrderTabsParamList> = RouteProp<OrderTabsParamList, T>;
export type OrderNavigationProp = MaterialTopTabNavigationProp<OrderTabsParamList>