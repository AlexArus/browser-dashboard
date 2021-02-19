import { isExtensionEnv } from 'utils/common';
import { standaloneTopSites } from 'utils/standaloneData';

export const getTopSites = (
  callback: (data: Array<chrome.topSites.MostVisitedURL>) => void
) => {
  if (isExtensionEnv) {
    chrome.topSites.get(callback);
  } else {
    callback(standaloneTopSites);
  }
};
