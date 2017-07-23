import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import AppWithNavState from './screens/AppNavigator';
import ReduxThunk from 'redux-thunk';

const App = () => {
  //temporarily disabled console warn because it was getting in the way of tabs on iOS
  // console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducers,{}, applyMiddleware(ReduxThunk))}>
        <AppWithNavState />
      </Provider>
    )
}

export default App;
