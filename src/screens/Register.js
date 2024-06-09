import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { Header } from '../components/Header';

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Register"/>
      <Text style={styles.label}>Email</Text>
      <TextInput
        autoCapitalize='none'
        style={[styles.textField, { marginBottom: 10, color: 'black' }]}
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        autoCapitalize='none'
        style={[styles.textField, { marginBottom: 30, color: 'black' }]}
        value={password}
        onChangeText={(e) => setPassword(e)}
      />
      <View style={{ marginBottom: 15 }} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleRegister}
        color='purple'
      >
        <Text style={styles.addButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleBack}
        color='purple'
      >
        <Text style={styles.addButtonText}>Back</Text>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#222831',
  },
  textField: {
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 4, 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    color: 'white', 
  },
  label: {
    paddingTop:10,
    color: 'white', 
    marginBottom: 5,
  },
  addButton: {
    marginBottom: 30,
    padding: 16,
    borderRadius: 25,
    backgroundColor: 'purple',
    alignItems: 'center',
    width:225,
    alignSelf:'center'
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
