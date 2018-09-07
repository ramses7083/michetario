/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Modal, Image, TouchableHighlight,
  Linking,} from 'react-native';

import { Fonts } from '../src/utils/Fonts'
import { Actions } from 'react-native-router-flux'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from "react-native-camera";
import { getData } from './api-client.js'

type Props = {};
export default class ScanView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      torchText: 'Encender linterna',
      torchMode: RNCamera.Constants.FlashMode.off,
      itemData: []
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  onSuccess(e) {
    console.warn(e.data)
    getData()
      .then(data =>  Actions.details({itemData: data}))
      .catch((error) => {
        this.setModalVisible(true);
      })
  }
  viewDetails = () => {
    getData()
      .then(data =>  Actions.details({itemData: data}))
      .catch((error) => {
        this.setModalVisible(true);
      })

   
    if (this.state.torchMode == RNCamera.Constants.FlashMode.torch) {
            console.warn('Apago linterna')
      this.setState({torchText: 'Encender linterna'})
      this.setState({torchMode: RNCamera.Constants.FlashMode.off})    
    } else {
      console.warn('Encendio linterna')
      RNCamera.Constants.FlashMode.torch
      this.setState({torchText: 'Apagar linterna'})
      this.setState({torchMode: RNCamera.Constants.FlashMode.torch})
    }
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <Image source={require('./assets/error.png')} style={styles.errorImage} resizeMode="contain"/>
              <Text style={styles.error}>Error</Text>
              <Text style={styles.errorMessage}>Articulo no encontrado</Text>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <View style={styles.botonModal}>
                  <Text style={styles.textoBotonModal}>
                    Reintentar
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
        </View>
      </Modal>
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Escanea el codigo de barras
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress={this.viewDetails}>
            <Text style={styles.buttonText}>{this.state.torchText}</Text>
          </TouchableOpacity>
        }
      />
      <RNCamera
            flashMode={this.state.torchMode}
        />
      </View>
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
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  errorImage: {
    width: 70,
    height: 70,
    marginBottom: 5
  },
  error: {
    color:"#33333D",
    marginVertical: 5,
    fontSize: 22,
    fontFamily: Fonts.PoppinsMedium
  },
  errorMessage: {
    color:"#9B9B9B",
    marginHorizontal : 12,
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.PoppinsMedium
  },
  botonModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    width: 90,
    height: 40,
    backgroundColor: '#fff',
    borderRadius:5,
    borderColor: '#000',
    borderWidth: 2,
  },
  textoBotonModal: {
    color:"#000",
    fontSize: 12,
    fontFamily: Fonts.PoppinsMedium
  },
  centerText: {
    flex: 1,
    fontSize: 20,
    fontFamily: Fonts.PoppinsMedium,
    padding: 32,
    color: '#777',
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    fontFamily: Fonts.PoppinsMedium,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
