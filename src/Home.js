import React, { useEffect, useState } from 'react';
import { db } from './firebase.js';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import Quiz from "./quiz.jpg"

export default function Home() {
  const [allQuizes, setAllQuizes] = useState('');

  useEffect(() => {
    db.collection('allQuizes')
      .doc(firebase.auth().currentUser.displayName)
      .collection('DBMS')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('hiiiiiiiiiiiiii ', doc.id, ' => ', doc.data());
        });
      });
  }, []);
  const print = () => {
    console.log(allQuizes);
  };
  return (
    <div>
     <img src={Quiz} />
    </div>
  );
}
