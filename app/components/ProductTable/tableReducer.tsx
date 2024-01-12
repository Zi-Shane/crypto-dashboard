import {
  COIN_QUOTES,
  COLUMNS,
  CURRENCY_QUOTE,
  QUOTE_GROUPS,
} from '@/constants';

export const ACTION_TYPE = {
  UPDATE_QUOTE: 'UPDATE_QUOTE',
  PAGE_CHANGE: 'PAGE_CHANGE',
  SORT_DATA: 'SORT_DATA',
};

export const INITIAL_STATE = {
  quote: {
    group: QUOTE_GROUPS.COIN,
    name: Object.values(COIN_QUOTES)[0],
  },
  page: 1,
  sortAttr: {
    column: COLUMNS.VOLUMN,
    desc: true,
  },
};

interface Payload {
  quote: QuoteType;
  page: number;
  sortAttr: SortAttr;
}

interface Action {
  type: string;
  payload: Payload;
}

export function tableReducer(state: Payload, action: Action): Payload {
  switch (action.type) {
    case ACTION_TYPE.PAGE_CHANGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case ACTION_TYPE.SORT_DATA:
      return {
        ...state,
        sortAttr: action.payload.sortAttr,
        page: action.payload.page,
      };
    case ACTION_TYPE.UPDATE_QUOTE:
      return {
        ...state,
        quote: action.payload.quote,
        page: action.payload.page,
      };
    default:
      return state;
  }
}
