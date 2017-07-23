import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actions from '../actions';
import {SearchItem} from '../components';
import * as theme from '../theme';

class SearchResult extends Component {
  constructor(props){
    super(props)
    this.state = {
      results: null
    }
  }

  static navigationOptions = {
    title: 'Search Results',
  }

  componentDidMount(){
    this.searchData()
  }

  searchData(){
    const url = {
      url: "https://api.spotify.com/v1/search?q="+this.props.appData.searchText+"&market=GB&type=track" ,
      headers: {'Authorization': 'Bearer ' + this.props.appData.token}
    };

    fetch(url).then((data)=> data.json())
    .then((data)=> this.setState({results: data.tracks.items}))
    .catch((err)=> console.log(err));
  }

  keyExtractor = (item,index) => item.id;

  renderItem = ({item}) => {
    return (<SearchItem item={item} from="search" />)
  }

  renderLoading(){
    return (<ActivityIndicator style={s.loading} color={theme.buttonText} size="large" animating />)
  }

  renderLoaded(){
    return (
      <View style={s.container}>
        <FlatList data={this.state.results}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        />
      </View>
    )
  }

  render(){
    if (!this.state.results){
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

export default connect(mapStateToProps,actions)(SearchResult);
