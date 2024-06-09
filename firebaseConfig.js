import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDn74kQC9Qxpc13Y2tZiahfMKm-nPQ-iLg",
  authDomain: "project-1-c474d.firebaseapp.com",
  projectId: "project-1-c474d",
  storageBucket: "project-1-c474d.appspot.com",
  messagingSenderId: "376632255002",
  appId: "1:376632255002:web:86af1d753964674e15e7a3",
  measurementId: "G-4GYHJ9YD2K"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
