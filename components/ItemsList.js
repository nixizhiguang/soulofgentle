import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Button, FlatList,StyleSheet } from "react-native";
import Item from '../components/Item';

export default class ItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };
  }

  render() {
      return (
        <View style={this.props.styles}>
          <FlatList
            data={this.props.items}
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            renderItem={
              ({item}) =>
              <Item
                item={item}
                key={item.id}
                goDetail={this.props.goDetail}
              />
            }
          />
        </View>
      );
  }
}