import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../screens/AppNavigator';

const initialNavState=AppNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0, actions: [NavigationActions.navigate({routeName: 'Main'})]
}));

export default nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case 'Main':
      nextState = AppNavigator.router.getStateForAction( NavigationActions.back(), state );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
return nextState || state;
};
