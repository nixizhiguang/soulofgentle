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
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import PixivAppApi from 'pixiv-app-api';
import {updateUser} from '../reducers/user';

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

  static propTypes = {
    navigation: PropTypes.object,
    updateUser: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      account: this.props.account,
      password: this.props.password,
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
          let userInfo = {...json, ...json.user};

          delete userInfo.user;

          this.props.updateUser(userInfo);

          AsyncStorage.setItem('user', JSON.stringify(userInfo));

          this.setState({loading: false});

          this.props.navigation.navigate('Home');
        },
        err => {
          console.log(err);
          this.setState({loading: false});
          return ToastAndroid.show("登录失败,请检查用户名和密码!", ToastAndroid.SHORT,ToastAndroid.CENTER);
        }
      );
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

// connect 导航...
const LoginScreenWithNav = withNavigation(LoginScreen);

// 用户信息从 state.comments 中获取
const mapStateToProps = (state) => {
  return {
    account: state.user.loginAccount,
    password: state.user.password,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 提供给 LoginScreen
    // 当Autologin失败或者登出之后进入此屏幕
    // 登录成功时将用户信息更新到store，记得缓存在本地存储中
    updateUser: (user) => {
      dispatch(updateUser(user))
    },
  }
}

class LoginScreenContainer extends React.Component {
   render() {
    return (
      <LoginScreenWithNav
        account={this.props.account}
        password={this.props.password}
        updateUser={this.props.updateUser}
       />
      );
  }
}

// 将 LoginScreen connect 到 store
// 会把 user, updateUser传给 LoginScreen
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreenContainer);
