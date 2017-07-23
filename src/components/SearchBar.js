import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions';
import * as theme from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

class sBar extends Component {

  enterKey(){
    //initiate the search when enter key is pressed
    this.props.onPress();
  }

  render(){
    const {searchText, onPress, takeAction} = this.props;
    return (
      <View style={s.container}>
        <View style={s.inputContainer}>
        <TextInput
        style={s.input}
        returnKeyType="search"
        onSubmitEditing={this.enterKey.bind(this)}
        onChangeText={(text) => takeAction('searchText',text)}
        placeholder="Search a track"
        underlineColorAndroid="rgba(255,255,255,0)"
        value={searchText}/>
        <TouchableOpacity onPress={() =>{searchText !== '' && onPress()}}>
          <View style={s.button}>
            <Text style={s.text}>search</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    backgroundColor: theme.header,
  },
  inputContainer: {
    alignSelf:'stretch',
    margin: 10,
    flexDirection: 'row',
    height: 40,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    flex: 0.8,
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10
  },
  text: {
    color: theme.headerText,
    fontSize: 16,
  },
  button: {
    padding:10,
    justifyContent:'center',
    height: 40,
  }
});

const mapStateToProps = state => {
  return state
}

const SearchBar = connect(mapStateToProps,actions)(sBar);

export {SearchBar}
