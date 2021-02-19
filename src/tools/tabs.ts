import { TabItem } from 'types/tab';
import { isExtensionEnv } from 'utils/common';
import { standaloneTabs } from 'utils/standaloneData';

export const getTabs = (callback: (data: Array<chrome.tabs.Tab>) => void) => {
  if (isExtensionEnv) {
    chrome.tabs.query({}, callback);
  } else {
    callback(standaloneTabs);
  }
};

export const chromeTabToTab = (item: chrome.tabs.Tab): TabItem => ({
  index: item.index,
  title: item.title ?? 'no title',
  url: item.url ?? 'blank',
  pinned: item.pinned,
  highlighted: item.highlighted,
  favIconUrl: item.favIconUrl ?? 'defaultIcon',
  id: item.id ?? -1,
});
