import { BookmarkIcon } from 'components/icons/BookmarkIcon';
import { ClockIcon } from 'components/icons/ClockIcon';
import { CrossIcon } from 'components/icons/CrossIcon';
import { TabIcon } from 'components/icons/TabIcon';
import React, { FC, useCallback } from 'react';
import { useStore } from 'store';
import { isExtensionEnv } from 'utils/chrome';

import styles from './SettingPopup.module.scss';

export type SettingPopupProps = {
  onClose: () => void;
};

export const SettingPopup: FC<SettingPopupProps> = React.memo(({ onClose }) => {
  const store = useStore();

  const onPopupClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.popup} onClick={onPopupClick}>
        <div className={styles.header}>
          Settings&amp;Info
          <div className={styles.closeButton} role="button" onClick={onClose}>
            <CrossIcon />
          </div>
        </div>
        <div className={styles.content}>
          <p>
            <BookmarkIcon />
            &nbsp;Bookmarks&nbsp;:&nbsp;
            <span className={styles.value}>
              {store.bookmarks.bookmarks.length}
            </span>
          </p>
          <p>
            <ClockIcon />
            &nbsp;History&nbsp;:&nbsp;
            <span className={styles.value}>{store.history.history.length}</span>
          </p>
          <p>
            <TabIcon />
            &nbsp;Tabs&nbsp;:&nbsp;
            <span className={styles.value}>{store.tabs.tabs.length}</span>
          </p>
          <p>
            &nbsp;Version&nbsp;:&nbsp;
            <span className={styles.value}>
              {process.env.REACT_APP_VERSION}
            </span>
          </p>
          {!isExtensionEnv && <p>Standalone</p>}
        </div>
      </div>
    </div>
  );
});

SettingPopup.displayName = 'SettingPopup';
