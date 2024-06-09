import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Logout } from '../components/Logout';
import { Header } from '../components/Header';
import uuid from 'react-native-uuid';
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';

export const AddTodo = ({ navigation }) => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const docReferance = collection(FIREBASE_DB, 'todos');
    const q = query(
      docReferance,
      where('userId', '==', FIREBASE_AUTH.currentUser.uid)
    );

    const subscriber = onSnapshot(q, {
      next: (snapshot) => {
        const arr = [];
        snapshot.docs.forEach((doc) => {
          arr.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(arr);
      },
    });

    setLoading(false);
    return () => subscriber();
  }, []);

  const addNewItem = async () => {
  const todoId = uuid.v4();
  const currentDate = new Date();
  try {
    await setDoc(doc(FIREBASE_DB, 'todos', todoId), {
      id: todoId,
      userId: FIREBASE_AUTH.currentUser.uid,
      title: text,
      createdAt: currentDate.toLocaleString('tr-TR'),
      completed: false,
    });
    setText('');
  } catch (e) {
    console.log(e);
  }
  Keyboard.dismiss();
};
  
  return (
    <KeyboardAvoidingView
  style={styles.container}
  behavior={Platform.OS === 'android' ? 'padding' : 'height'}
>
  <View style={{ flex: 1 }}>
    <Header title="Add Todo" />
    <View style={styles.inputContainer}>
      <TextInput
        value={text}
        onChangeText={(e) => setText(e)}
        style={styles.textInput}
        placeholder='Add Todo'
        placeholderTextColor={'#555'}
      />   
    </View>
  </View>
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.button,
        {
          backgroundColor: `rgba(255, 0, 255, ${text === '' ? 0.4 : 1})`,
        },
      ]}
      onPress={addNewItem}
      disabled={text === ''}
    >
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <Ionicons name="add" size={100} color="white" />
      )}
    </TouchableOpacity>
  </View>
  <TouchableOpacity
    style={styles.goButton}
    onPress={() => navigation.navigate('TodoScreen')}
  >
    <Text style={styles.goButtonText}>Todos Screen</Text>
  </TouchableOpacity>
  <Logout />
</KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#222831',
  },
  textInput: {
    fontSize: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'black',
    color: 'white',
    flex: 1,
    marginRight: 8,
    marginTop:10
  },
  inputContainer: {
    flexDirection: 'row',
    paddingTop:30
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 35,
    borderRadius: 999,
    marginTop:20,
  },
  goButton: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'purple',
    alignItems: 'center',
  },
  goButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
