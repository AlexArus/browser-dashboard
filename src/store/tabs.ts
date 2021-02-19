import { TabItem } from 'types/tab';
import { actionFactory } from 'utils/store';

export const tabsState = {
  tabs: [] as Array<TabItem>,
};

const action = actionFactory('tabs');

export const setTabsAction = action<Array<TabItem>>((action) => ({
  tabs: action.payload,
}));
