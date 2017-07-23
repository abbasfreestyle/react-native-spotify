import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {ImageRatio} from './imageratio';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../theme';

class PlaylistTrackComponent extends Component {

  render(){
    const {item, goPlay} = this.props;
    const {preview_url,artists,name,album} = item.track;
    return (
      <TouchableOpacity onPress={goPlay}>
        <View style={s.item}>
          {album.images[2] ? <ImageRatio style={s.image} source={album.images[2].url} /> : <View style={s.image} />}
            <View style={s.textContainer}>
              <View style={s.title}>
                <Text style={s.text}>{artists[0].name}</Text>
                <Text style={s.track}>{name}</Text>
              </View>
              {preview_url && <Icon style={s.icon} color={theme.buttonText} name="play-arrow" size={25} />}
            </View>
          </View>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const p = props.item.track;
  return ({
  goPlay: () => dispatch(NavigationActions.navigate({
    routeName: 'Play',
    params: {
      item: props.item,
      preview_url:p.preview_url,
      title: p.artists[0].name,
      image:p.album.images[0].url,
      from:props.from,
    }
  })),
})
}

const s = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius:25,
    margin:10,
    backgroundColor:'grey',
  },
  item: {
    alignSelf:'stretch',
    flexDirection: 'row',
    backgroundColor:theme.button,
    justifyContent:'center',
    marginBottom: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 10,
  },
  title:{
    flex: 1,
    justifyContent:'center',
  },
  icon: {
    padding:10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.buttonText,
  },
  track: {
    fontSize: 14,
    color: theme.buttonText,
  }
});

const PlaylistTrack = connect(null, mapDispatchToProps)(PlaylistTrackComponent);

export {PlaylistTrack}
