import {AppRegistry} from 'react-native';
import App from './src/app';

AppRegistry.registerComponent('spotifyApp',()=> App);

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   Button,
//   View
// } from 'react-native';
//
// import SpotifyAuth from 'react-native-spotify-auth';
// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
//
// export default class spotifyApp extends Component {
//
//   constructor(props){
//     super(props)
//     this.state = {
//       token: null,
//       data: null,
//     };
//   }
//   getData(){
//     // console.log(this.state.token);
//
//     const url = {
//       url: "https://api.spotify.com/v1/search?q=ice%20cube&market=GB&type=track" ,
//       headers: {
//          'Authorization': 'Bearer ' + this.state.token
//       }
//     };
//
//     fetch(url).then((data)=> data.json())
//     .then((data)=> {
//       console.log(data)
//       this.setState({data: data},()=> console.log(this.state.data))
//     })
//     .catch((err)=> console.log(err));
//   }
//
//   playfirst(){
//     const url = this.state.data.tracks.items[19].preview_url;
//     console.log(url);
//     ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
//   }
//
//   stopIt(){
//     ReactNativeAudioStreaming.stop();
//   }
//
//   login(){
//     let auth = new SpotifyAuth('3a47ad198e40406aae4e05e8d0e003db', 'spotify-app://');
//     auth.startLogin()
//       .then(
//         function(data) {
//           console.log(data.token);
//           this.setState({token: data.token},()=>console.log(this.state.token))
//         }.bind(this),
//         function(error){
//           console.warn(error);
//         }
//       );
//   }
//
//   render() {
//
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Button title="login" onPress={this.login.bind(this)} />
//         <Button title="search" onPress={this.getData.bind(this)} />
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Button title="Play" onPress={this.playfirst.bind(this)} />
//         <Button title="stop" onPress={this.stopIt.bind(this)} />
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('spotifyApp', () => spotifyApp);
