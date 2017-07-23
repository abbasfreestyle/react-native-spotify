import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actions from '../actions';
import {PlaylistTrack} from '../components';
import * as theme from '../theme';

class ViewPlaylist extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
  });

  componentDidMount(){
    this.getPlaylist()
  }

  getPlaylist(){
    this.props.takeAction('listLoading',true);
    const {playlistid,userid} = this.props.navigation.state.params;
    const url = {
      url: "https://api.spotify.com/v1/users/"+userid+"/playlists/"+playlistid+"/tracks" ,
      headers: {'Authorization': 'Bearer ' + this.props.appData.token}
    };

    fetch(url).then((data)=> data.json())
    .then((data)=> this.props.playlistUpdate(data.items))
    .catch((err)=> console.log(err));
  }

  keyExtractor = (item,index) => item.track.id;

  renderItem = ({item}) => {
    return (<PlaylistTrack item={item} from="featured" />)
  }

  renderLoading(){
    return (<ActivityIndicator style={s.loading} color={theme.buttonText} size="large" animating />)
  }

  renderLoaded(){
    return (
      <View style={s.container}>
        <FlatList data={this.props.appData.playlist}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        />
      </View>
    )
  }

  render(){
    if (this.props.appData.listLoading){
      return this.renderLoading()
    }
    return this.renderLoaded();
  }
}

const mapStateToProps = state => {
    return state;
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent:'center',
    alignSelf:'center',
  }
});

export default connect(mapStateToProps,actions)(ViewPlaylist);
