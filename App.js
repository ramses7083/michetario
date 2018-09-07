/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,
  Linking,} from 'react-native';

import { Actions, Scene, Router } from 'react-native-router-flux'
import ScanView from './src/ScanView';
import DetailsView from './src/DetailsView';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="scan" component={ScanView} title={'MICHETARIO'}/>
    <Scene key="details" component={DetailsView} title={'Detalles'} backTitle={'Escanear'}/>
  </Scene>
);

export default class App extends Component<Props> {
  onSuccess(e) {
    console.warn(e.data)
  }
  render() {
    return (
       <Router scenes={scenes}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
