import { isExtensionEnv } from 'utils/chrome';

const countItems = isExtensionEnv ? 0 : 25;
const maxTopSites = 10;
const url = 'http://google.com';

export const standaloneBookmarks: Array<chrome.bookmarks.BookmarkTreeNode> = [];
export const standaloneHistory: Array<chrome.history.HistoryItem> = [];
export const standaloneTopSites: Array<chrome.topSites.MostVisitedURL> = [];
export const standaloneTabs: Array<chrome.tabs.Tab> = [];

for (let i = 1; i <= countItems; i++) {
  standaloneBookmarks.push({
    id: i.toString(),
    title: `Bookmark (lorem inpsum lorem inpsum lorem inpsum lorem inpsum lorem inpsum ) ${i}`,
    url,
  });

  standaloneHistory.push({
    id: i.toString(),
    title: `History item (lorem inpsum lorem inpsum lorem inpsum lorem inpsum lorem inpsum ) ${i}`,
    url,
    lastVisitTime: i,
  });

  if (i <= maxTopSites) {
    standaloneTopSites.push({
      title: `Top site (lorem inpsum lorem inpsum lorem inpsum lorem inpsum lorem inpsum ) ${i}`,
      url,
    });
  }

  standaloneTabs.push({
    id: i,
    favIconUrl: url,
    title: `Tab (lorem inpsum lorem inpsum lorem inpsum lorem inpsum lorem inpsum ) ${i}`,
  } as chrome.tabs.Tab);
}

standaloneBookmarks.push({
  id: '26',
  title: '',
  url,
});

standaloneHistory.push({
  id: '26',
  title: '',
  url,
});
