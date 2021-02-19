import React from 'react';
import { FC } from 'react';

import './style.css';

export const Theme: FC = React.memo(({ children }) => <>{children}</>);
Theme.displayName = 'Theme';
