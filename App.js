import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Header from './src/components/Header';
import KrypotoMain from './src/components/KryptoMain';


export default class App extends React.Component {

  render() {
    return (
      <React.Fragment >
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.container}>
          <KrypotoMain />
        </View>

      </React.Fragment >
    );
  }

}

const styles = StyleSheet.create({

  header: {
    flex: 0.08,
    padding: 10,
    paddingBottom: 30,
    backgroundColor: 'rgba(76,175,80,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

});
