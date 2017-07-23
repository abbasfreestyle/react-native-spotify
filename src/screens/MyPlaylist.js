import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchItem} from '../components';
import * as theme from '../theme';

class MyPlaylist extends Component {
  static navigationOptions = {
    title: 'My Playlists',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list" color={theme.headerText} size={30} />
    ),
  }

  keyExtractor = (item,index) => item.id;

  renderItem = ({item,index}) => {
    return (<SearchItem item={item} index={index} from="playlist" />)
  }

  render(){
    const {myPlaylist} = this.props.appData;
    //If the playlist is empty, show nothing
    if (!myPlaylist || (myPlaylist.length === 0)){
      return (
        <View style={s.loading}>
          <Icon name="music-note" size={100} color="lightgrey" />
          <Text>There's no tracks in your playlist, search for a track and add them here</Text>
        </View>
      )
    }
    return (
      <View style={s.container}>
      <FlatList data={myPlaylist}
      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
      />
      </View>
    )
  }
}

const s = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    tintColor: 'black',
  },
  container: {
    flex: 1,
  },
  loading: {
    flex:1,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    padding: 20,
  }
});

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(MyPlaylist);
