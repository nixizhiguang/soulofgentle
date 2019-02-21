import React, { Component } from "react";
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
  AsyncStorage
} from "react-native";

import ItemsList from '../components/ItemsList';
import TopMenu from '../components/TopMenu';
import SearchMenu from '../components/SearchMenu';

import PixivAppApi from 'pixiv-app-api';

//const pixiv = new PixivAppApi(process.env.USERNAME, process.env.PASSWORD)

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#e9f1f4",
    padding: 10,
  },
  topBar: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  historys: {
    flex: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: '2.5%'
  },
  historyButton: {
    flex: 1,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    width: '95%',
  },
  searchMemu: {
    flexDirection: "column",
    flex: 12,
    justifyContent: "flex-start",
    backgroundColor: "#e9f1f4",
    width: '100%',
  },
  searchList:{
    flexDirection: "column",
    flex: 12,
    justifyContent: "flex-start",
    backgroundColor: "#e9f1f4",
    padding: 0,
    width: '100%',
  },
  colButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20
  },
  mainView: {
    zIndex: 1
  },
  loadingView:{
    zIndex: 2,
    flex: 12,
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  icon:{
    width: 20,
    height: 20
  }
});

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/images/home.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
        title: navigation.getParam('screenTitle', 'Home'),
        headerStyle: {
          backgroundColor: '#e9f1f4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
           fontWeight: 'bold',
        },
      };
    };
    constructor(props) {
      super(props);

      this.state = {
        displayTopBar: true,
        displaySearchMenu: false,
        displayList: true,
        displayBackButton: false,
        displayHistorys: false,
        loading: false,
        isEx: false,
        displayAdvancedSearchMenu: false,
        advancedSearch: false,
        searchType: 'normal',
        searchItems: [],
        bookTypes: [],
        selectedBookType: null,
        keyword: '',
        historys: [],
      };

      this.submitSearch = () => {
        let keyword = this.state.keyword;
        let historys = this.state.historys.concat();
        let existIndex = historys.findIndex((v,i,arr) => {return v.keyword === keyword;});

        if(existIndex !== -1){
           historys.splice(existIndex, 1);
        }

        historys.unshift({keyword});

        this.setState({
          displayBackButton: false,
          displayHistorys: false,
          displayList: true,
          displaySearchMenu: false,
          loading:true,
          historys
        });

        /*pixiv.searchIllust('1231231')
        .then(json => {
          console.log(`downloading ${json.illusts[0].title}`);
          return pixivImg(json.illusts[0].imageUrls.large);
        }).then(() => {
          console.log('finish');
        });*/
      };

      this.handleSearchInput = (keyword) => {
        this.setState({
          keyword: keyword,
        });
      };

      this.backToOrigin = () => {
        this.setState({
          displayBackButton: false,
          displayHistorys: false,
          displayList: true,
          displaySearchMenu: false,
        });

        this.props.navigation.navigate('Login');
      };

      this.showSearchMenu = () => {
        this.setState({
          displaySearchMenu: true,
        });
      };

      this.goDetail = () => {

      };

      this.showSearchHistory = () => {
        this.setState({
          displayBackButton: true,
          displayHistorys: true,
          displayList: false
        });
      };

       this.hideHistory = () => {
        this.setState({
          displayBackButton: false,
          displayHistorys: false,
          displayList: true
        });
      };

      this.clearKeyword = () => {
        this.setState({
          keyword: ''
        });
      }
  }

  render() {
      return (
      <View style={styles.container}>
        <View style={this.state.displayTopBar ? styles.topBar : {display:'none'}}>
          <TopMenu
            submitSearch={this.submitSearch}
            handleSearchInput={this.handleSearchInput}
            backToOrigin={this.backToOrigin}
            showSearchMenu={this.showSearchMenu}
            showSearchHistory={this.showSearchHistory}
            clearKeyword={this.clearKeyword}
            isEx={this.state.isEx}
            displayBackButton={this.state.displayBackButton}
            keyword={this.state.keyword}
          />
        </View>
        <View style={this.state.displayHistorys ? styles.historys : {display:'none'}}>
          <FlatList
            data={this.state.historys}
            style={{flex: 1}}
            renderItem={
              ({item}) =>
                <TouchableOpacity
                  style={styles.historyButton}
                  title={''}
                  key={item.keyword}
                  onPress={(item) => {
                    this.setState({
                      keyword: item.keyword
                    },() =>{
                      this.submitSearch();
                    });
                  }}
                >
                  <Text>{item.keyword}</Text>
                </TouchableOpacity>
            }
            ListEmptyComponent={() => {return null;}}
            keyExtractor={(item, index) => item.keyword}
          />
        </View>
        <SearchMenu
          style={this.state.displaySearchMenu ? styles.searchMemu : {display: 'none',...styles.searchMemu}}
          bookTypes={this.state.bookTypes}
          displayAdvancedSearchMenu={this.state.displayAdvancedSearchMenu}
          advancedSearch={this.state.advancedSearch}
          searchType={this.state.searchType}
          toggleType={(type) => this.setState({searchType: type})}
          selectedBookType={this.state.selectedBookType}
          toggleBookType={(bookType) => this.setState({selectedBookType: bookType.id})}
        />
        <View style={this.state.displayList ? styles.searchList : {display: 'none',...styles.searchList}}>
          <ItemsList
            items={this.state.searchItems}
            goDetail={this.goDetail}
            ListEmptyComponent={() => 
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}>
                <Text style={{flex: 1}}>{this.state.networkStatus === 'online' ? '无结果' : 'sad panda'}</Text>
              </View>
            }
            onRefresh={()=>{}}
            refreshing={this.state.loading}
          />
        </View>
      </View>
      );
  }
}
