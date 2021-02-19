import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { FC } from 'react';
import { useStore, useDispatch } from 'store';
import { setSearchStringAction } from 'store/app';
import { isExtensionEnv } from 'utils/common';

import styles from './Page.module.scss';

export const Page: FC = React.memo(() => {
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchStringAction(''));
  }, [dispatch]);

  const onSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchStringAction(e.target.value));
    },
    [dispatch]
  );

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>categories</div>
        <input
          value={store.app.searchString}
          placeholder="Search..."
          onChange={onSearchChange}
        />
        <div>options</div>
      </header>
      <section className={styles.content}>
        <section>
          bookmarks
          {store.bookmarks.bookmarks.map((bookmark) => (
            <p>
              <img
                src={`chrome://favicon/${bookmark.url}`}
                alt={bookmark.title}
              />
              <a href={bookmark.url}>{bookmark.title}</a>
            </p>
          ))}
        </section>
        <section>
          history
          {store.history.history.map((history) => (
            <p>
              <img
                src={`chrome://favicon/${history.url}`}
                alt={history.title}
              />
              <a href={history.url}>{history.title}</a>
            </p>
          ))}
        </section>
        <section>
          tabs
          {store.tabs.tabs.map((tab) => (
            <p>
              <img src={`chrome://favicon/${tab.favIconUrl}`} alt={tab.title} />
              {tab.title}
            </p>
          ))}
        </section>
        <section>
          topSites
          {store.topSites.topSites.map((topSite) => (
            <p>
              <img
                src={`chrome://favicon/${topSite.url}`}
                alt={topSite.title}
              />
              <a href={topSite.url}>{topSite.title}</a>
            </p>
          ))}
        </section>
      </section>
      <footer className={styles.footer}>
        <p>Bookmarks: {store.bookmarks.bookmarks.length}</p>
        <p>History: {store.history.history.length}</p>
        <p>Tabs: {store.tabs.tabs.length}</p>
        <p>TopSites: {store.topSites.topSites.length}</p>
        <p>Version: {process.env.REACT_APP_VERSION}</p>
        {!isExtensionEnv && <p>Stand alone mode</p>}
      </footer>
    </main>
  );
});

Page.displayName = 'Page';
