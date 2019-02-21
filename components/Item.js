import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Button, FlatList,StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item:{
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#F5FCFF",
    flexDirection: "row",
  },
  imageView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "row"
  },
  itemImage:{
    flex: 1,
  },
  detailView: {
    flex: 3,
    justifyContent: "flex-start",
    backgroundColor: "#F5FCFF",
    flexDirection: "column"
  },
  title: {
    flex: 2,
    flexWrap: 'nowrap'
  },
  uploader: {
    flex:1,
    justifyContent: "flex-start",
  },
  stars:{
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bookType: {
    flex: 2,
    justifyContent: "space-between",
    flexDirection: "row",
  }
});

export default class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity 
        style={styles.item}
        onPress={() => this.props.goDetail(item)}
      >
        <View style={styles.imageView}>
          <Image style={styles.itemImage} soucre={item.image} />
        </View>
        <View style={styles.detailView}>
          <View style={styles.title}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.uploader}>
            <Text>{item.uploader}</Text>
          </View>
          <View style={styles.stars}>
            /*<Stars />*/
            <Text style={{flex:1}}>{item.stars}</Text>
            <Text style={{flex:1}}>{item.language}</Text>
          </View>
          <View style={styles.bookType}>
            <Text  style={{flex:1}}>{item.bookType}</Text>
            <Text style={{flex:1}}>{item.updated_at}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


/*
 <View style={styles.actionContainer}>
            {
            item.downloaded
            ? <>
                <TouchableOpacity
                  title={'阅读'}
                  style={styles.actionButton}
                  onPress={() => this.props.navigation.navigate('ItemDetail',item)}
                />
                <TouchableOpacity
                  title={'删除'}
                  style={styles.actionButton}
                  onPress={() => this.props.dispatchDelete(item)}
                />
              </>
            : <TouchableOpacity
                title={'下载'}
                style={styles.actionButton}
                onPress={() => this.props.pushDownloadTask(item)}
              />
            }
            <TouchableOpacity
              title={'收藏'}
              style={item.collected ? [statusOn,styles.actionButton] : styles.actionButton}
              onPress={() => this.props.pushCollectTask(item)}
            />
            <TouchableOpacity
              title={'点赞'}
              style={item.liked ? [statusOn,styles.actionButton] : styles.actionButton}
              onPress={() => this.props.pushLikeTask(item)}
            />
          </View>

          <View style={styles.tagContainer}>
            {item.tags.map((tag) =>
              <Button
                title={tag.name}
                style={styles.tagButton}
                onPress={() => this.props.goTagSearch(tag)}
              />
            )}
          </View>
 */