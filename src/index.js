import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTniwnMhXKLY2Tpje9xiArbrQnk1o7QBQ",
  authDomain: "react-chat-app-c5a69.firebaseapp.com",
  databaseURL: "https://react-chat-app-c5a69-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-c5a69",
  storageBucket: "react-chat-app-c5a69.appspot.com",
  messagingSenderId: "934054466469",
  appId: "1:934054466469:web:54b9f135fa171bc5d60e4c",
  measurementId: "G-4KJYDMW92E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
