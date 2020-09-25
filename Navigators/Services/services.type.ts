import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native";

export type ServicesParamList = {
  SelectServices: undefined,
  
  // bubbled up
  Home: undefined
}

export type ServicesNavigationProp<T extends keyof ServicesParamList> = StackNavigationProp<ServicesParamList, T>;

export type ServicesRouteProp<T extends keyof ServicesParamList> = RouteProp<ServicesParamList, T>;
