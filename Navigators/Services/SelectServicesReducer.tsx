
export type SelectServicesState = {
  washedAndDried: {
    title: string,
    active: boolean
  },
  dryCleaningIroned: {
    title: string,
    active: boolean
  },
  duvetsAndBulky: {
    title: string,
    active: boolean
  },
  ironingOnly: {
    title: string,
    active: boolean
  },
}
type SelectServiceAction =
  | { type: 'TOGGLE_SERVICE', key: keyof SelectServicesState }
export function selectServiceReducer(state: SelectServicesState, action: SelectServiceAction) {
  switch (action.type) {
    case 'TOGGLE_SERVICE':
      const updatedField = state[action.key];
      updatedField.active = !updatedField.active;
      return {
        [action.key]: updatedField,
        ...state
      };

    default:
      return state;
  }
}
