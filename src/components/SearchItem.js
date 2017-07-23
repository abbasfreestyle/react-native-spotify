import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {ImageRatio} from './imageratio';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../theme';

class SearchComponent extends Component {

  render(){
    const {item, appData, action, goPlay} = this.props;
    const {id} = item;
    //check if this has been added in my playlist
    let added = false;
    for (var val in appData.myPlaylist) {
       if (appData.myPlaylist[val].id === id){
         added = true;
         break;
       }
    }

    return (
      <TouchableOpacity onPress={goPlay}>
        <View style={s.item}>
            <View style={s.imageContainer}>
              <ImageRatio style={s.image} source={item.album.images[2].url} />
            </View>
            <View style={s.textContainer}>
              <View style={s.title}>
                <Text style={s.artist}>{item.artists[0].name}</Text>
                <Text style={s.track}>{item.name}</Text>
              </View>
              {item.preview_url && <Icon style={s.icon} color={theme.buttonText} name="play-arrow" size={25} />}
              <Icon
                style={s.icon}
                name={!added ? "add-circle-outline" : "remove-circle"}
                color={theme.buttonText}
                size={25}
                onPress={()=> {!added ? action.addToMyPlaylist(item) : action.removeFromMyPlaylist(item)}}
              />
            </View>
          </View>
      </TouchableOpacity>
    )
  }
}

const s = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  imageContainer: {
    padding: 10,
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
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    padding:10,
  },
  artist: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.buttonText,
  },
  track: {
    fontSize:14,
    color: theme.buttonText,
  },
  icon: {
    padding:10,
  },
});

const mapDispatchToProps = (dispatch, props) => ({
  action: bindActionCreators(actions,dispatch),
  goPlay: () => dispatch(NavigationActions.navigate({
    routeName: 'Play',
    params: {
      item: props.item,
      preview_url:props.item.preview_url,
      title: props.item.artists[0].name,
      image:props.item.album.images[0].url,
      from:props.from,
      position: props.index
    }
  })),
})

const mapStateToProps = state => {
  return state
};

const SearchItem = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);

export {SearchItem}
