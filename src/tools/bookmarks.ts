import { standaloneBookmarks } from 'utils/standaloneData';
import { isExtensionEnv } from 'utils/chrome';
import { BookmarkItem } from 'types/bookmark';

export const getBookmarks = (
  callback: (data: Array<chrome.bookmarks.BookmarkTreeNode>) => void
) => {
  if (isExtensionEnv) {
    chrome.bookmarks.getTree(callback);
  } else {
    callback(standaloneBookmarks);
  }
};

export const chromeBookmarkTreeNodeToBookmark = (
  item: chrome.bookmarks.BookmarkTreeNode
): BookmarkItem => ({
  id: item.id,
  title: item.title,
  url: item.url ?? 'no url',
});
