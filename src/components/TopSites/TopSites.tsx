import { Link } from 'components/Link/Link';
import { FC, memo } from 'react';
import { useStore } from 'store';
import { getFavIconUrl } from 'utils/chrome';

import styles from './TopSites.module.scss';

export const TopSites: FC = memo(() => {
  const store = useStore();

  return (
    <section className={styles.container}>
      {store.topSites.topSites.map((topSite) => (
        <Link
          key={topSite.url}
          className={styles.link}
          iconUrl={getFavIconUrl(topSite.url)}
          name={topSite.title}
          url={topSite.url}
        />
      ))}
    </section>
  );
});

TopSites.displayName = 'TopSites';
