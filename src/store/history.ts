import { HistoryItem } from 'types/history';
import { actionFactory } from 'utils/store';

export const historyState = {
  history: [] as Array<HistoryItem>,
};

const action = actionFactory('history');

export const setHistoryAction = action<Array<HistoryItem>>((action) => ({
  history: action.payload,
}));
