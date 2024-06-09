import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { ActivityIndicator, View } from 'react-native';
import { Register } from '../screens/Register';
import { AddTodo } from '../screens/AddTodo';
import { TodoScreen } from '../screens/TodoScreen';

const Stack = createStackNavigator();

export const Root = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={'aqua'} size={'medium'} />
      </View>
    );
  }

  const mainStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='TodoScreen' component={TodoScreen} />
        <Stack.Screen name='AddTodo' component={AddTodo} />
      </Stack.Navigator>
    );
  };

  const authStack = () => {
    return (
      <Stack.Navigator  
        screenOptions={{
        headerShown: false,
      }}>    
        <Stack.Screen name='Sign In' component={Login} />
        <Stack.Screen name='Register' component={Register} />
      </Stack.Navigator>
    );
  };

  if (user) {
    return mainStack();
  } else {
    return authStack();
  }
};
