import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import EditItems from '../store/features/EditItems';

export const TodoItem = ({ data, range }) => {
  const isLastItem = data.index + 1 === range;
  const { showActionSheetWithOptions } = useActionSheet();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const isEdit = useSelector((state) => state.edItems.isEdit);

  const toggleTodo = async () => {
    try {
      await updateDoc(doc(FIREBASE_DB, 'todos', data.item.id), {
        completed: !data.item.completed,
      });
      console.log(`[${data.item.id}] completed as [${!data.item.completed}]`);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodoItem = async () => {
    try {
      await deleteDoc(doc(FIREBASE_DB, 'todos', data.item.id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoItem = async () => {
    try {
      await updateDoc(doc(FIREBASE_DB, 'todos', data.item.id), {
        title: newTodoTitle,
      });
      setEditModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onLongPress = () => {
    const options = ['Edit', 'Delete', 'Cancel'];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        containerStyle: { backgroundColor: 'aqua', borderRadius:20 },
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            setEditModalVisible(true);
            break;

          case destructiveButtonIndex:
            deleteTodoItem();
            break;
        }
      }
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={toggleTodo}
      onLongPress={onLongPress}
      style={[
        styles.container,
        {
          borderTopLeftRadius: data.index === 0 ? 16 : 0,
          borderTopRightRadius: data.index === 0 ? 16 : 0,
          borderBottomLeftRadius: isLastItem ? 16 : 0,
          borderBottomRightRadius: isLastItem ? 16 : 0,
        },
      ]}
    >
      <View style={styles.innerContainer}>
  <Ionicons
    name={data.item.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
    size={24}
    color="black"
  />
  <View style={styles.textContainer}>
    <Text style={styles.itemText}>{data.item.title}</Text>
    <Text style={styles.itemDateText}>{data.item.createdAt}</Text>
  </View>
</View>

{isEdit && (
  <View style={{ flexDirection: 'row' }}>
    <TouchableOpacity 
      style={styles.iconButton} 
      onPress={() => setEditModalVisible(true)}
    >
      <Feather name='edit' size={24} color={'aqua'}/>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.iconButton,]}
      onPress={() => deleteTodoItem(data.item.id)}
    >
      <Ionicons name='trash' size={24} color={'yellow'} />
    </TouchableOpacity>
  </View>
)}

<Modal
  animationType="slide"
  transparent={true}
  visible={editModalVisible}
  onRequestClose={() => {
    setEditModalVisible();
  }}
>
  <TouchableOpacity
    style={styles.centeredView}
    onPress={() => setEditModalVisible(false)}
    activeOpacity={1}
  >    
    <View style={styles.modalView}>
      <Text style={{color:'white', fontSize:20, marginBottom:25 }}>Update Todo</Text>
      <TextInput
        style={[styles.input, styles.updateText]}
        value={newTodoTitle}
        onChangeText={setNewTodoTitle}
        placeholder="..."
        placeholderTextColor="gray"
      />
      <TouchableOpacity style={styles.saveButton} onPress={updateTodoItem}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
</Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C738BD',
    padding: 10,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    paddingLeft: 8,
  },
  itemText: {
    fontSize: 16,
  },
  itemDateText: {
    fontSize: 11,
    marginTop: 8,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 200,
    color: 'white',
  },
  saveButton: {
    backgroundColor: 'purple',
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginTop:20,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  updateText: {
    color: 'white',
  },
  iconButton: {
    padding: 8,
  },
});
