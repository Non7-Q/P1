import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {setEditButtonOff,setEditButtonOn,toggleEditButton} from '../store/features/EditItems';

export const EditBtn = () => {
  const [isDisable] = useState(false);
  const dispatch = useDispatch();
  const buttonState = useSelector((state) => state.edItems);
  const isEdit = buttonState.isEdit;
  const todos = useSelector((state) => state.todos);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={isDisable}
        style={styles.editButton}
        onPress={() => dispatch(toggleEditButton())}
      >
        <Text
          style={[
            styles.buttonText,
            { color: isDisable ? 'grey' : isEdit ? 'red' : '#007AFF' },
          ]}
        >
          {isEdit ? 'Cancel' : 'Edit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
