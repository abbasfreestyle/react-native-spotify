import React, {Component} from 'react';
import {View, Text, StyleSheet,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AudioPlayer, ImageRatio} from '../components';
import * as actions from '../actions';
import * as theme from '../theme';

class PlayMusic extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Play Track',
  });

  constructor(props){
    super(props);
    this.state= {
      image: null,
      url: null,
      prev: null,
      next: null,
    };
    this.position = this.props.navigation.state.params.position;
  }

  componentDidMount(){
    //update the position on mount
    this.newPosition(this.position)
  }

  newPosition(position){

    const {from} = this.props.navigation.state.params;

    //check if the source is from myPlaylist, if not then don't provide autoplay
    if (from === 'playlist'){
      const {myPlaylist} = this.props.appData;

      //check if the previous or next track exists, to avoid the playlist from overflowing
      let prev = myPlaylist[position-1] ? myPlaylist[position-1].album.images[0].url : null;
      let next = myPlaylist[position+1] ? myPlaylist[position+1].album.images[0].url : null;

      this.setState({
        image: myPlaylist[position].album.images[0].url,
        url: myPlaylist[position].preview_url,
        prev: prev,
        next: next
      },()=>{
        //if there's no preview_url Available, skip to the next track to keep things flowing. This is not perfect, but it's okay for now.
        !this.state.url && this.newPosition(this.position++)
      });
    } else {
      const {preview_url,image} = this.props.navigation.state.params;
      this.setState({image: image, url: preview_url });
    }
  }

  selectNextTrack(){
    this.state.next && this.next();
  }

  prev(){
    this.position--
    this.newPosition(this.position)
  }

  next(){
    this.position++
    this.newPosition(this.position)
  }

  renderLoading(){
    return (<ActivityIndicator style={s.loading} color={theme.buttonText} size="large" animating />)
  }

  renderLoaded(){
    return (
      <View style={s.container}>
        <View style={s.image}><ImageRatio player={true} source={this.state.image} /></View>
        <AudioPlayer
        url={this.state.url}
        onPlayEnd={this.selectNextTrack.bind(this)}
        onPrev={this.prev.bind(this)}
        onNext={this.next.bind(this)}
        previous={this.state.prev}
        next={this.state.next}
        />
      </View>
    )
  }

  render(){
    if (!this.state.image){
      return this.renderLoading()
    }
    return this.renderLoaded()
  }

}

const mapStateToProps = state => {
    return state;
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'stretch',
    backgroundColor:'black',
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent:'center',
    alignSelf:'center',
  }
});

export default connect(mapStateToProps,actions)(PlayMusic);
