import React, { Component } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

 <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />

static navigationOptions = ({ navigation }) => {
	    return {
	    	drawerLabel: 'Populars',
	    	drawerIcon: ({ tintColor }) => (
			      <Image
			        source={require('../assets/images/populars-icon.png')}
			        style={[styles.icon, {tintColor: tintColor}]}
			      />
    		),
	      title: navigation.getParam('screenTitle', 'Populars'),
	      headerStyle: {
		      backgroundColor: '#f4511e',
		  },
		  headerTintColor: '#fff',
		  headerTitleStyle: {
		     fontWeight: 'bold',
		  },
	    };
	  };