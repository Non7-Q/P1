import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';

export const Logout = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.outButton}
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text style={[styles.buttonText, { color: 'yellow' }]}>Çıkış yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  outButton: {
    paddingBottom: 20,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
