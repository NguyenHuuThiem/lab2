import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function App() {

  return (
    <View style={styles.container}>
     <TextInput placeholder='Tên'
     />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anh:{
    width:50,
    height:50
  },
});
