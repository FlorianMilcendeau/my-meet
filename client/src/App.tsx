import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import Root from './components/routes/Root';
import store from './redux/index';

function App(): ReactElement {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
