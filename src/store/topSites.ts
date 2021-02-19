import { TopSiteItem } from 'types/topSite';
import { actionFactory } from 'utils/store';

export const topSitesState = {
  topSites: [] as Array<TopSiteItem>,
};

const action = actionFactory('topSites');

export const setTopSitesAction = action<Array<TopSiteItem>>((action) => ({
  topSites: action.payload,
}));
