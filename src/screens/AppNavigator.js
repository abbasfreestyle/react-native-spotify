import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BackHandler} from 'react-native';
import {addNavigationHelpers, StackNavigator, TabNavigator} from 'react-navigation';
import {NavigationActions} from 'react-navigation';
import * as theme from '../theme';

import HomePage from '../screens/HomePage';
import MyPlaylist from '../screens/MyPlaylist';
import PlayMusic from '../screens/PlayMusic';
import SearchResult from '../screens/SearchResult';
import ViewPlaylist from '../screens/ViewPlaylist';

const settings =   {
  navigationOptions: {
      headerStyle: {
        backgroundColor: theme.header,
        elevation: 0
      },
      headerTintColor: theme.headerText,
      headerTitleStyle:{ color: theme.headerText },
  }
};

const TabsNavigator = TabNavigator({
  Home: {screen: HomePage},
  Playlist: {screen: MyPlaylist}
},{
  tabBarOptions: {
    activeTintColor: theme.headerText ,
    inactiveTintColor: 'grey' ,
    pressColor: theme.headerText ,
    // pressOpacity: theme.buttonText ,
    indicatorStyle: { backgroundColor: theme.headerText} ,
    style: {backgroundColor: theme.header},
    upperCaseLabel: true,
  }
});

export const AppNavigator = StackNavigator({
  Main: {screen: TabsNavigator},
  Search: {screen: SearchResult},
  Play: {screen: PlayMusic},
  ViewPlaylist: {screen: ViewPlaylist},
},settings);

class AppWithNavState extends Component {
  //We need to setup a Back button listener for Android, React Navigation doesn't support this out of the box while using Redux.
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) { return false }
    dispatch(NavigationActions.back());
    return true;
  };

  render(){
    const {dispatch, nav} = this.props;
    return <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})} />
  }
}

const mapStateToProps = state => ({nav: state.nav });

export default connect(mapStateToProps)(AppWithNavState);
