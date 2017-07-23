import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import RNAudioStreamer from 'react-native-audio-streamer';

class AudioPlayer extends Component {

  constructor(props){
    super(props)
    this.state = {playing: false}
    this.prevStatus = '';
  }

  componentDidMount(){
    //Add a listener to make a callback when the track finishes playing
    this.subscription = DeviceEventEmitter.addListener('RNAudioStreamerStatusChanged',this.statusChanged.bind(this));
    //Autoplay this track
    this.pressed();
  }

  statusChanged(status){
      //On Android FINISHED is called twice on track change. This causes a side effect of skipping 2 tracks at a time. setup a previous status variable to check if the last status was finished. Hack i'm not proud of.
      if (status === "FINISHED" && this.prevStatus !== "FINISHED"){
        this.prevStatus = status;
        //If the track reaches the end of playlist, just stop it.
        this.props.next ? this.switcher() : this.pressed();
        //callback for the outer component once this track has ended
        this.props.onPlayEnd();
      } else {
        //reset the previous status to keep things flowing
        this.prevStatus = status;
      }
  }

  pressed(){
    this.props.url && this.setState({playing: !this.state.playing},()=>this.toggleMusic());
  }

  toggleMusic(){
    this.state.playing ? this.playIt() : this.pauseIt();
  }

  playIt(){
    //Make sure that the URL is not empty or it'll throw an error
    this.props.url && RNAudioStreamer.setUrl(this.props.url)
    RNAudioStreamer.play()
  }

  pauseIt(){
    RNAudioStreamer.pause()
  }

  stopIt(){
    RNAudioStreamer.pause()
  }

  switcher(){
    //Stop the player so the new URL is updated
    this.pressed();
    //Adding short set timeout to play the updated URL
    setTimeout(()=>this.pressed(), 100);
  }

  componentWillUnmount(){
    DeviceEventEmitter.removeListener('RNAudioStreamerStatusChanged',this.statusChanged.bind(this));
    this.stopIt()
  }

  render(){
    const {url,previous,next,onPrev,onNext} = this.props;
    return (
      <View style={s.audio}>
        {!url && <Text style={s.nostream}>No Preview Available</Text>}
        <View style={s.player}>
          <View style={s.icon} >
            <Icon name="skip-previous" size={75} color={previous ? "black" : "lightgrey"} onPress={()=>{if(previous){onPrev();this.switcher()}}} />
          </View>
          <View style={s.icon} >
            <Icon onPress={this.pressed.bind(this)} color={url ? "black" : "lightgrey"} name={this.state.playing ? "pause" : "play-arrow"} size={75} />
          </View>
          <View style={s.icon} >
            <Icon name="skip-next" size={75} color={next ? "black" : "lightgrey"} onPress={()=> {if(next){onNext();this.switcher()} }} />
          </View>
        </View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  audio: {
    backgroundColor:'white',
    height: 200,
    padding: 20,
    justifyContent:'center',
  },
  player: {
    height: 100,
    flexDirection:'row',
    padding: 20,
    justifyContent:'space-between',
  },
  icon: {
    height: 75,
    width: 75,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  nostream: {
    alignSelf:'center',
  }
});

export {AudioPlayer}
