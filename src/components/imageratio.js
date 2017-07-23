import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

class ImageRatio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: { width, height },
      height: 1,
      width: 1,
    };
  }

  componentDidMount(){
    Image.getSize(this.props.source, (w, h) => {
      this.setState({height:h,width:w});
    },(e)=>{
      console.warn('error: '+e);
      this.setState({height:width, width:width});
    });
  }


  onLayoutDidChange = (e) => {
    var ratio = this.state.width/this.state.height;
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: width+1, height: width/ratio } });
    setTimeout(function () {
      this.setState({ size: { width: width, height: width/ratio } });
    }.bind(this), 100);
  }

  render() {
    return (
      <View style={this.props.radiusStyle} onLayout={this.onLayoutDidChange}>
        <Image source={{uri: this.props.source}} style={[this.state.size,this.props.style,this.props.radiusStyle]}>
        {this.props.children}
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
});
export {ImageRatio};
