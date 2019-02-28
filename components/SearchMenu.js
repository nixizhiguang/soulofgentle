import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, TextInput, Button, StyleSheet } from "react-native";
import PropTypes from 'prop-types'

export default class SearchMenu extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <View style={this.props.styles}>
          <Text style={{flex: 1,justifyContent: "flex-start",}}>{
            this.props.searchType === 'normal'
            ? '一般搜索'
            : this.props.searchType === 'uploader'
              ?  '指定上传者'
              :  '指定标签' //'tag'
          }</Text>
          <View style={styles.bookTypes}>
            {this.props.bookTypes.map((bookType) =>
                <Button
                  title={bookType.name}
                  style={
                    this.props.selectedBookTypes.length === 0
                    || this.props.selectedBookTypes.findIndex((v,i,arr) => {
                      return v === bookType.id;
                    }) === -1 ? styles.notSelectedType : styles.selectedType
                  }
                  onPress={() => this.props.toggleBookType(bookType)}
                />
            )}
          </View>
          <View style={styles.searchTypes}>
            <Button
              title={''}
              style={styles.radioButton}
              onPress={() => this.props.toggleSearchType('origin')}
            >
              <Image
                style={styles.radioImg}
                source={this.props.searchType === 'normal' ? require('../assets/images/radio-on.png') : require('../assets/images/radio.png')}
              />
              <Text>一般搜索</Text>
            </Button>
            <Button
              title={''}
              style={styles.radioButton}
              onPress={() => this.props.toggleSearchType('uploader')}
            >
              <Image
                style={styles.radioImg}
                source={this.props.searchType === 'uploader' ? require('../assets/images/radio-on.png') : require('../assets/images/radio.png')}
              />
              <Text>指定上传者</Text>
            </Button>
            <Button
              title={''}
              style={styles.radioButton}
              onPress={() => this.props.toggleSearchType('tag')}
            >
              <Image
                style={styles.radioImg}
                source={this.props.searchType === 'tag' ? require('../assets/images/radio-on.png') : require('../assets/images/radio.png')}
              />
              <Text>指定标签</Text>
            </Button>
          </View>
          {
            this.props.isLogined
            ? <View>
                <View>
                  {/*这里放一个问号按钮*/}
                  <Button
                    title={''}
                    style={styles.switchButton}
                    onPress={() => this.props.toggleAdvance()}
                  >
                    <Image
                      style={styles.switchImg}
                      source={this.props.advancedSearch ? require('../assets/images/switch-on.png') : require('../assets/images/switch-off.png')}
                    />
                    <Text>高级搜索</Text>
                  </Button>
                </View>
                <View style={
                  this.props.displayAdvancedSearchMenu 
                  ? styles.advancedSearchMenu 
                  : {display: 'none',...styles.advancedSearchMenu}
                }>
                  {/*这里放高级菜单*/}
                </View>
              </View>
            : null
          }
        </View>
      );
  }
}

const styles = StyleSheet.create({
  bookTypes: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#F5FCFF",
    flexDirection: "column",
  },
  searchTypes:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#F5FCFF",
    flexDirection: "column",
  },
  notSelectedType: {
    opacity: 0,
  },
  selectedType:{
    opacity: 0.5,
  },
  radioButton:{
    flex: 5,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 2
  },
  radioImg: {
    width: 5,
    height: 5,
    padding: 0
  },
  switchButton: {
    flex: 5,
    backgroundColor: '#DDDDDD',
    padding: 2
  },
  switchImg: {
    width: 8,
    height: 5,
    padding: 0
  },
  advancedSearchMenu: {

  }
});
