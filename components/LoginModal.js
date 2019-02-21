<View style={this.state.showLoginContainer ? {} : {display:'none'}}>
  <View style={styles.loginModal}>
    <TextInput
      style={{height: 40}}
      placeholder="请输入账号"
      onChangeText={(text) => this.setState({text})}
      onSubmitEditing={this.submit}
    />
    <TextInput
      style={{height: 40}}
      placeholder="请输入密码"
      onChangeText={(text) => this.setState({text})}
      onSubmitEditing={this.submit}
    />
  </View>
</View>