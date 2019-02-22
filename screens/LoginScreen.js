import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  ToastAndroid,
  View,
  StyleSheet,
  TextInput,
  Text
} from 'react-native';
import { withNavigation } from 'react-navigation';

import PixivAppApi from 'pixiv-app-api';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#DDD',
  },
  mainView: {
    flex: 0.4,
    top: '20%',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#DDD',
    width: '100%',
    //zIndex: 1,
  },
  loadingView: {
    flex: 1,
    //zIndex: 2,
    backgroundColor: 'rgba(27,31,35,.05)',
    width: '100%',
  },
});

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);

    this.state = {
      account: null,
      password: null,
      captcha: null,
      loading: false
    };

    this.login.bind(this);
  }

  login = () => {
    this.setState({loading: true});

    const pixiv = new PixivAppApi();

    pixiv.login(this.state.account, this.state.password)
      .then(
        json => {
          this.setState({loading: false});
          console.log(json);
          return;

          let loginFailed = true;
          if(loginFailed){
            return ToastAndroid.show("登录失败!", ToastAndroid.SHORT,ToastAndroid.CENTER);
          }

          AsyncStorage.setItem('refreshToken', json.refresh_token);
          AsyncStorage.setItem('accessToken', json.access_token);

          this.props.navigation.navigate('Home');
        },
        err => console.log(err)
      )
      .then(() => {
        console.log('finish login action');
      });
  }

  render() {
    return (
      <View style={styles.loginContainer}>
        <View style={this.state.loading ? {display: 'none'} : styles.mainView}>
          <TextInput
            style={{
              flex: 1,
              width: '60%',
              padding: 0
            }}
            placeholder="请输入账号"
            onChangeText={(text) => this.setState({account: text})}
            onSubmitEditing={this.login}
            value={this.state.account}
          />
          <TextInput
            style={{
              flex: 1,
              width: '60%',
              padding: 0
            }}
            secureTextEntry={true}
            placeholder="请输入密码"
            onChangeText={(text) => this.setState({password: text})}
            onSubmitEditing={this.login}
            value={this.state.password}
          />
          <TextInput
            style={{
              flex: 1,
              width: '60%',
              padding: 0
            }}
            placeholder="请输入验证码(可选)"
            onChangeText={(text) => this.setState({captcha: text})}
            onSubmitEditing={this.login}
            value={this.state.captcha}
          />
          <TouchableOpacity
            title=""
            onPress={this.login}
            style={{
              flex: 0.5,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '60%',
              padding: 8,
              backgroundColor: 'black',
            }}
          >
            <Text style={{
              flex: 0.4,
              color: 'white',
              fontStyle: 'normal',
              fontSize: 30
            }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
        <View style={this.state.loading ? styles.loadingView : {display: 'none'}}>
          <ActivityIndicator animating={true} />
        </View>
      </View>
    );
  }
}

export default withNavigation(LoginScreen);
