import React from 'react';
import { fire } from './firebase.js';
function Home() {
  return (
    <div>
      <div>Welcome Home</div>
      <center>
        <button
          onClick={() => {
            fire.auth().signOut();
          }}
        >
          Logout
        </button>
      </center>
    </div>
  );
}

export default Home;
