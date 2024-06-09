import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Logout } from '../components/Logout';
import { EditBtn } from '../components/EditBtn';
import { TodoItem } from '../components/TodoItem';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
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

export const TodoScreen = ({ navigation }) => {
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1 }}>
        <Header title="Todos Screen" />
        <EditBtn />
        <View style={styles.inputContainer}>
          <FlatList
            data={todos}
            renderItem={(item) => <TodoItem data={item} range={todos?.length} />}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingTop: 24 }}
            scrollEnabled={todos?.length > 0}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyComponent}>
                <Ionicons name='list' size={90} color={'white'} />                
                <Text style={styles.emptyText}>Good Job!</Text>
              </View>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.goButton}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Text style={styles.goButtonText}>Add Todo</Text>
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
  inputContainer: {
    flexDirection: 'row',
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
  seperator: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
  },
  emptyComponent: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    color: 'white',
    fontSize: 30,
  },
});
