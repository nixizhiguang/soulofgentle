import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class RadioButton extends Component {
  render() {
    const opacity = this.props.disabled ? 0.2 : 1;
    let layout = { flexDirection: 'row' };
    let margin = { marginLeft: 10 };
    if (this.props.layout === 'column') {
      layout = { alignItems: 'center' };
      margin = { marginTop: 10 };
    }
    return (
      <TouchableOpacity
        style={[layout, { opacity, marginHorizontal: 10, marginVertical: 5 }]}
        onPress={() => {
          this.props.disabled ? null : this.props.onPress(this.props.label);
        }}>
        <View
          style={[
            styles.border,
            {
              borderColor: this.props.color,
              width: this.props.size,
              height: this.props.size,
              borderRadius: this.props.size / 2,
              alignSelf: 'center'
            },
          ]}>
          {this.props.selected &&
            <View
              style={{
                backgroundColor: this.props.color,
                width: this.props.size / 2,
                height: this.props.size / 2,
                borderRadius: this.props.size / 2,
              }}
            />}
        </View>
        <Text style={[{ alignSelf: 'center' }, margin, {color: this.props.labelColor}]}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});