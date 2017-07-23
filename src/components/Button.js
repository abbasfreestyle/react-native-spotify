import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as theme from '../theme';

class Button extends Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={s.buttonContainer}>
          <Text style={s.text}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const s = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.button,
    margin: 20,
  },
  text: {
    fontSize: 16,
    color: theme.buttonText,
    alignSelf:'center',
    padding: 10,
  }
});

export {Button};
