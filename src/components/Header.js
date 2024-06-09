import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>  
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    padding: 15,
    backgroundColor: 'darkblue',
    borderRadius: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 3,
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});