import React, {Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {ImageRatio} from './imageratio';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../theme';

class FeatItem extends Component {

  render(){
    const {item, goViewPlaylist} = this.props;
    return (
      <TouchableOpacity onPress={goViewPlaylist}>
        <View style={s.item}>
          <ImageRatio style={s.image} source={item.images[0].url} />
          <View style={s.textContainer}>
            <Text style={s.text}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  goViewPlaylist: () => dispatch(NavigationActions.navigate({routeName: 'ViewPlaylist', params: {item: props.item, title: props.item.name, userid: props.item.owner.id, playlistid: props.item.id}})),
})

const mapStateToProps = state => {
  return state
};

const s = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
  icon: {
    alignSelf:'center',
    padding: 10,
  },
  item: {
    alignSelf:'stretch',
    flexDirection: 'row',
    backgroundColor: theme.button,
    justifyContent:'center',
    marginBottom: 2,
    height: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    padding:10,
  },
  text: {
    color: theme.buttonText,
    fontSize: 20,
  }
});

const FeaturedItem = connect(mapStateToProps, mapDispatchToProps)(FeatItem);

export {FeaturedItem}
