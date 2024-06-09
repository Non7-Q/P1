import { Provider } from 'react-redux';
import store from './src/store/store';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Root } from './src/navigation/root';

export default function App() {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <NavigationContainer>  
          <Root />
        </NavigationContainer>
      </ActionSheetProvider>
    </Provider>
  );
}
