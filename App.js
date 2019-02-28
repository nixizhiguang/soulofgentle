import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { httpsOverHttp, httpOverHttp } from 'tunnel-agent';
import axios from 'axios';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import userReducer from 'reducers/user';

// 防止console系列函数影响性能，可以用插件在打包过程中直接去掉这些函数的调用
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  };
}

const TUNNEL_OPTIONS = {
  proxy: {
    host:'127.0.0.1',
    port: 1080
  }
};

axios.interceptors.request.use(function (config) {
  config.proxy = false; // 强制禁用环境变量中的代理配置
  config.httpAgent = httpOverHttp(TUNNEL_OPTIONS);
  config.httpsAgent = httpsOverHttp(TUNNEL_OPTIONS);
  return config;
});

class AppContainer extends React.Component {
  render() {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
//adb connect 127.0.0.1:7555

const store = createStore(userReducer);

export default class App extends React.Component {
 render() {
      return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}