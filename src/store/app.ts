import { chromeHistoryToHistory, getHistory } from 'tools/history';
import { chromeTabToTab, getTabs } from 'tools/tabs';
import { getTopSites } from 'tools/topSites';
import { TabItem } from 'types/tab';
import { HistoryItem } from 'types/history';
import { actionFactory } from 'utils/store';
import { setTabsAction } from 'store/tabs';
import { setTopSitesAction } from 'store/topSites';
import { setHistoryAction } from 'store/history';
import {
  chromeBookmarkTreeNodeToBookmark,
  getBookmarks,
} from 'tools/bookmarks';
import { BookmarkItem } from 'types/bookmark';
import { setBookmarksAction } from 'store/bookmarks';
import { filterByTitle } from 'utils/common';

export const appState = {
  searchString: '',
};

const action = actionFactory('app');

export const setSearchStringAction = action<string>(
  (action) => ({
    searchString: action.payload.trim(),
  }),
  (action, dispatch) => {
    const search = action.payload.trim().toLocaleLowerCase();

    getBookmarks((chromeBookmarks) => {
      const bookmarks: Array<BookmarkItem> = [];

      const bookmarkTraverse = (
        bookmarkTrees: Array<chrome.bookmarks.BookmarkTreeNode>
      ) => {
        bookmarkTrees.forEach((bookmark) => {
          if (bookmark.children?.length) {
            bookmarkTraverse(bookmark.children);
          } else if (bookmark.url) {
            bookmarks.push(chromeBookmarkTreeNodeToBookmark(bookmark));
          }
        });
      };
      bookmarkTraverse(chromeBookmarks);

      dispatch(setBookmarksAction(filterByTitle(search, bookmarks)));
    });

    getHistory((chromeHistory) => {
      let histories: Array<HistoryItem> = chromeHistory.map(
        chromeHistoryToHistory
      );

      dispatch(setHistoryAction(filterByTitle(search, histories)));
    });

    getTabs((chromeTabs) => {
      let tabs: Array<TabItem> = chromeTabs.map(chromeTabToTab);
      dispatch(setTabsAction(filterByTitle(search, tabs)));
    });

    getTopSites((topSites) => {
      dispatch(setTopSitesAction(filterByTitle(search, topSites)));
    });
  }
);
