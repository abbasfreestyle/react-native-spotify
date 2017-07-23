import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  WebView,
  Platform,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PopupDialog , {SlideAnimation} from 'react-native-popup-dialog';
import {SearchBar, FeaturedItem, Button} from '../components';
import {NavigationActions} from 'react-navigation';
import * as actions from '../actions';
import {bindActionCreators} from 'redux';
import SpotifyAuth from 'react-native-spotify-auth';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import * as theme from '../theme';

//use dimensions to style the PopupDialog
const {width,height} = Dimensions.get('window');

class HomePage extends Component {

  static navigationOptions = {
    title: 'Spotify',
    tabBarIcon: ({ tintColor }) => (
      <FontIcon name="spotify" color={theme.headerText} size={30} />
    ),
  }

  constructor(props){
    super(props);
    //set the authorise link up
    this.url = 'https://accounts.spotify.com/authorize';
    this.url += '?response_type=token';
    this.url += '&client_id=' + encodeURIComponent('3a47ad198e40406aae4e05e8d0e003db');
    this.url += '&redirect_uri=' + encodeURIComponent('https://abbasfarid.com/callback/');
    this.state = {
      data: null,
    };
  }

  componentDidMount(){
    //check if android device is already logged in
    Platform.OS === "android" && this.loginAndroid();
  }

  login(){
    Platform.OS === "ios" ? this.popupDialog.show() : this.loginAndroid();
  }

  loginAndroid(){
      let auth = new SpotifyAuth('3a47ad198e40406aae4e05e8d0e003db', 'spotify-app://');
      auth.startLogin().then(
        (data)=> this.props.actions.takeAction('token',data.token),
        (error)=> console.warn(error)
      );
    }

  getData(){
    const url = {
      url: "https://api.spotify.com/v1/browse/featured-playlists",
      headers: {'Authorization': 'Bearer ' + this.props.appData.token}
    };

    fetch(url).then((data)=> data.json())
    .then((data)=> this.setState({data: data.playlists.items}))
    .catch((err)=> console.log(err));
  }

  bridgeMessage(msg){
    if (msg.nativeEvent.data !== "{}"){
      const data = {};
      //For some reason parsing can sometimes throw an error, insert a try and catch to keep things flowing
      try { data = JSON.parse(msg.nativeEvent.data) }
      catch(err) {console.log(err) }

      const token = data.access_token;
      this.props.actions.takeAction('token',token);

    }
  }

  keyExtractor = (item,index) => item.id;

  renderItem = ({item}) => {
    return (<FeaturedItem item={item} />)
  }

  renderLogin(){
    return (
      <View style={s.loading}>
        <StatusBar animated backgroundColor={theme.header} barStyle="light-content" />
        <Text style={s.welcome}>Welcome to React Native Spotify</Text>
        <Button title="LOGIN" color={theme.buttonText} onPress={this.login.bind(this)} />
        <PopupDialog
          dialogStyle={s.popup} width={width-20} height={height-150}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }>
            <View style={{alignSelf:'stretch', flex: 1}}>
            <WebView
            source={{uri: this.url}}
            style={{alignSelf:'stretch',height:400}}
            javaScriptEnabled={true}
            injectedJavaScript={injectScript}
            onMessage={this.bridgeMessage.bind(this)}
            />
          </View>
        </PopupDialog>
      </View>
    )
  }

  startSearch(){ this.props.goSearch() }

  renderList(){
    //If there's no data, show a loading spinner and fetch the data
    if (!this.state.data){
      this.getData();
      return (<ActivityIndicator style={s.loading} color={theme.backgroundText} size="large" animating />)
    }

    return (
      <View style={s.container}>
        <StatusBar animated backgroundColor={theme.header} barStyle="light-content" />
        <SearchBar onPress={this.startSearch.bind(this)} />
        <FlatList data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor} />
      </View>
    )
  }

  render(){
    if(!this.props.appData.token){
      return this.renderLogin()
    }
    return this.renderList()
  }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = (dispatch,props) => ({
  actions: bindActionCreators(actions,dispatch),
  goSearch: () => dispatch(NavigationActions.navigate({routeName: 'Search', params: {searchText: props.searchText}})),
})

const s = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: theme.buttonText,
  },
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    color: theme.backgroundText,
  },
  loading: {
    backgroundColor: theme.background,
    flex:1,
    justifyContent:'center',
    alignSelf:'stretch',
    alignItems:'center',
  },
  popup: {
    marginBottom: 100,
    padding: 5,
  },
});

const injectScript = `
  (function () {
    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      console.log(hashParams)
      return JSON.stringify(hashParams);
    }

    if (window.postMessage){
      window.postMessage(getHashParams(),'*')
    }
  }());
`;

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
