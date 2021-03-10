import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link, LinkProps } from 'components/Link/Link';
import { TopSites } from 'components/TopSites/TopSites';
import { maxItems } from 'const';
import { FC } from 'react';
import { useStore, useDispatch } from 'store';
import { setSearchStringAction } from 'store/app';
import { getFavIconUrl } from 'utils/chrome';
import { List } from 'components/List/List';
import { ClockIcon } from 'components/icons/ClockIcon';
import { BookmarkIcon } from 'components/icons/BookmarkIcon';
import { TabIcon } from 'components/icons/TabIcon';
import { GearIcon } from 'components/icons/GearIcon';
import { SettingPopup } from 'components/SettingPopup/SettingPopup';

import styles from './Page.module.scss';

export const Page: FC = React.memo(() => {
  const store = useStore();
  const dispatch = useDispatch();

  const [isSettingVisible, setIsSettingVisible] = useState(false);

  useEffect(() => {
    dispatch(setSearchStringAction(''));
  }, [dispatch]);

  const onSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchStringAction(e.target.value));
    },
    [dispatch]
  );

  const onTabClick = useCallback(
    (link: LinkProps<number>) => {
      if (link.id) {
        const tab = store.tabs.tabs.find((tab) => tab.id === link.id);
        if (tab) {
          chrome.tabs.highlight({ tabs: [tab.index] });
        }
      }
    },
    [store]
  );

  const onSettingClick = useCallback(() => {
    setIsSettingVisible(true);
  }, []);

  const onSettingClose = useCallback(() => {
    setIsSettingVisible(false);
  }, []);

  return (
    <>
      {isSettingVisible && <SettingPopup onClose={onSettingClose} />}

      <main className={styles.container}>
        <TopSites />
        <header className={styles.header}>
          <input
            className={styles.search}
            value={store.app.searchString}
            placeholder="Search..."
            onChange={onSearchChange}
          />
          <div
            className={styles.settingButton}
            role="button"
            onClick={onSettingClick}
          >
            <GearIcon />
          </div>
        </header>
        <section className={styles.content}>
          <List
            title={
              <>
                <TabIcon />
                &nbsp; Tabs
              </>
            }
            items={store.tabs.tabs.slice(0, maxItems)}
          >
            {(tabItem) => (
              <Link
                className={styles.linkContainer}
                key={tabItem.id}
                id={tabItem.id}
                iconUrl={getFavIconUrl(tabItem.favIconUrl)}
                name={tabItem.title}
                onClick={onTabClick}
              />
            )}
          </List>

          <List
            className={styles.bookmarkBlock}
            title={
              <>
                <BookmarkIcon />
                &nbsp; Bookmarks
              </>
            }
            items={store.bookmarks.bookmarks.slice(0, maxItems)}
          >
            {(bookmarkItem) => (
              <Link
                className={styles.linkContainer}
                key={bookmarkItem.id}
                iconUrl={getFavIconUrl(bookmarkItem.url)}
                name={bookmarkItem.title}
                url={bookmarkItem.url}
              />
            )}
          </List>

          <List
            title={
              <>
                <ClockIcon />
                &nbsp; History
              </>
            }
            items={store.history.history.slice(0, maxItems)}
          >
            {(historyItem) => (
              <Link
                className={styles.linkContainer}
                key={historyItem.lastVisitTime}
                iconUrl={getFavIconUrl(historyItem.url)}
                name={historyItem.title}
                url={historyItem.url}
              />
            )}
          </List>
        </section>
      </main>
    </>
  );
});

Page.displayName = 'Page';
