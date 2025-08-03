// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyVqF5Mmn0ImQ8V9JORBK-K0C2Bn-xBd4",
  authDomain: "pesananonim-843d6.firebaseapp.com",
  databaseURL: "https://pesananonim-843d6-default-rtdb.firebaseio.com",
  projectId: "pesananonim-843d6",
  storageBucket: "pesananonim-843d6.appspot.com",
  messagingSenderId: "628233179263",
  appId: "1:628233179263:web:54b915aef951ae06a86f4a",
  measurementId: "G-T002ZGE4MM"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, remove, update };
