import { useCallback, useMemo } from 'react';
import { isEmpty } from 'utils/string';

import styles from './Link.module.scss';

export type LinkProps<Id> = {
  id?: Id;
  className?: string;
  iconUrl?: string;
  placeholder?: string;
  name?: string;
  url?: string;
  onClick?: (link: LinkProps<Id>) => void;
};

export function Link<Id>(props: LinkProps<Id>) {
  const { className, iconUrl, placeholder = 'Empty name', name, url } = props;

  const content = useMemo(() => {
    if (isEmpty(name)) {
      return <span className={styles.placeholder}>{placeholder}</span>;
    }
    return <span className={styles.text}>{name}</span>;
  }, [name, placeholder]);

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (props.onClick) {
        event.preventDefault();
        props.onClick(props);
      }
    },
    [props]
  );

  const classNames = [styles.container, className].join(' ');
  return (
    <div className={classNames}>
      <a href={url} title={name} onClick={onClick}>
        {iconUrl && <img className={styles.icon} src={iconUrl} alt={name} />}
        {content}
      </a>
    </div>
  );
}
