import React from 'react';
import ReactDOM from 'react-dom';
import { Page } from 'components/Page/Page';
import { Theme } from 'components/Theme/Theme';
import { StoreProvider } from 'store';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <StoreProvider>
        <Page />
      </StoreProvider>
    </Theme>
  </React.StrictMode>,
  document.getElementById('application')
);
