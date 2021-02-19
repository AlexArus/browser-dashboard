import { BookmarkItem } from 'types/bookmark';
import { actionFactory } from 'utils/store';

export const bookmarksState = {
  bookmarks: [] as Array<BookmarkItem>,
};

const action = actionFactory('bookmarks');

export const setBookmarksAction = action<Array<BookmarkItem>>((action) => ({
  bookmarks: action.payload,
}));
