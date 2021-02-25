import React from 'react';

import styles from './List.module.scss';

export type ListProps<Item> = {
  title?: React.ReactNode;
  items: Array<Item>;
  className?: string;
  children: (item: Item) => React.ReactNode;
};

export function List<Item>({
  title,
  items,
  className,
  children,
}: ListProps<Item>) {
  const classNames = [styles.container, className].join(' ');
  return (
    <section className={classNames}>
      {title && <div className={styles.title}>{title}</div>}
      {items.map((item) => children(item))}
    </section>
  );
}
