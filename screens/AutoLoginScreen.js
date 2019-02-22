import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",// 决定布局是以横轴为主轴还是竖轴为主轴
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class AutoLoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Autoloading',
  };

  constructor() {
    super();
    // Fetch the token from storage then navigate to our appropriate place
    this._bootstrapAsync = () => {
     /* const userToken = await AsyncStorage.getItem('userToken');

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if(userToken){
        // 此处切换为ex模式
        this.props.navigation.navigate('Home');
        return;
      }*/

      // 首次载入登录态之后,默认进去主页
      //this.props.navigation.navigate('Login');
      this.props.navigation.navigate('Login');
      return;
    };
  }

  componentDidMount (){
     // 首次载入登录态之后,默认进去主页
     this._bootstrapAsync();
  }

  // 退出登录
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

//export default withNavigation(AutoLoginScreen);