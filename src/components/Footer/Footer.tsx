import React, { FC, memo } from 'react';
import { useStore } from 'store';
import { BookmarkIcon } from 'components/icons/BookmarkIcon';
import { ClockIcon } from 'components/icons/ClockIcon';
import { TabIcon } from 'components/icons/TabIcon';
import { isExtensionEnv } from 'utils/chrome';

import styles from './Footer.module.scss';

export const Footer: FC = memo(() => {
  const store = useStore();
  return (
    <footer className={styles.container}>
      <p>
        <BookmarkIcon />
        &nbsp;:&nbsp;
        {store.bookmarks.bookmarks.length}
      </p>
      <p>
        <ClockIcon />
        &nbsp;:&nbsp;
        {store.history.history.length}
      </p>
      <p>
        <TabIcon />
        &nbsp;:&nbsp;
        {store.tabs.tabs.length}
      </p>
      <p>{process.env.REACT_APP_VERSION}</p>
      {!isExtensionEnv && <p>Standalone</p>}
    </footer>
  );
});

Footer.displayName = 'Footer';
