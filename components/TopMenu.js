import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput,StyleSheet } from "react-native";
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    flex: 0.95,
    justifyContent: "flex-start",
    backgroundColor: "#e9f1f4",
    borderStyle: 'dashed',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    flexWrap: 'nowrap'
  },
  buttonImg: {
    width: 20,
    height: 20,
  },
  smallBtn:{
    flex:1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#bfbfbf'
  },
  searchInput: {
    flex:8,
    padding:2
  }
});

class TopMenu extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <View style={styles.topBar}>
          {
            this.props.displayBackButton
            ? <TouchableOpacity
                style={styles.smallBtn}
                onPress={this.props.backToOrigin}
              >
                <Image
                  style={styles.buttonImg}
                  source={require('../assets/images/arrow-left.png')}
                />
              </TouchableOpacity>
            : <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => {
                  this.props.navigation.openDrawer();
                  return;
                }}
              >
                <Image
                  style={styles.buttonImg}
                  source={require('../assets/images/menu.png')}
                />
              </TouchableOpacity>
          }
          <TextInput
            style={styles.searchInput}
            placeholder={(this.props.isEx ? 'EX' :'EH') + '搜索'}
            onChangeText={this.props.handleSearchInput}
            onSubmitEditing={this.props.submitSearch}
            onFocus={this.props.showSearchHistory}
            value={this.props.keyword}
          />
          {
            this.props.displayBackButton
            ? <TouchableOpacity
                style={styles.smallBtn}
                onPress={this.props.clearKeyword}
              >
                <Image
                  style={styles.buttonImg}
                  source={require('../assets/images/close.png')}
                />
              </TouchableOpacity>
            : <TouchableOpacity
                style={styles.smallBtn}
                onPress={this.props.showSearchMenu}
              >
                <Image
                  style={styles.buttonImg}
                  source={require('../assets/images/plus.png')}
                />
              </TouchableOpacity>
          }
        </View>
      );
  }
}

export default withNavigation(TopMenu);