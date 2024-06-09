import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { useState } from 'react';
import { Header } from '../components/Header';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Sign In"/>
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
        onPress={handleLogIn}
        color='purple'
      >
        <Text style={styles.addButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Register')}
        color='purple'
      >
        <Text style={styles.addButtonText}>Register</Text>
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
