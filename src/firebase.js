import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyATVj6Azw9y8cjgoA3eHltr3M56vcpTYWM',
  authDomain: 'quizistic-7103b.firebaseapp.com',
  projectId: 'quizistic-7103b',
  storageBucket: 'quizistic-7103b.appspot.com',
  messagingSenderId: '115148652491',
  appId: '1:115148652491:web:062bbf9c1ab7581f1bc04e',
  measurementId: 'G-SJDVM3NDCE',
};
const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { fire, db, auth, storage };
