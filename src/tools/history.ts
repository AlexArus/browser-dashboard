import { HistoryItem } from 'types/history';
import { isExtensionEnv } from 'utils/chrome';
import { standaloneHistory } from 'utils/standaloneData';

const microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
const oneWeekAgo = new Date().getTime() - microsecondsPerWeek;

export const getHistory = (
  callback: (data: Array<chrome.history.HistoryItem>) => void
) => {
  if (isExtensionEnv) {
    chrome.history.search(
      { startTime: oneWeekAgo, text: '', maxResults: 20 },
      callback
    );
  } else {
    callback(standaloneHistory);
  }
};

export const chromeHistoryToHistory = (
  item: chrome.history.HistoryItem
): HistoryItem => ({
  title: item.title ?? 'no title',
  url: item.url ?? 'no url',
  lastVisitTime: item.lastVisitTime ?? 0,
});
