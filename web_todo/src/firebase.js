// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database"; // Adicione 'push' aqui

const firebaseConfig = {
    apiKey: "AIzaSyA2sm-XR_OgPY_SRWr0a5hhlUcovM0ZFDE",
    authDomain: "bd-td-list.firebaseapp.com",
    databaseURL: "https://bd-td-list-default-rtdb.firebaseio.com", // Adicione a URL do Realtime Database
    projectId: "bd-td-list",
    storageBucket: "bd-td-list.firebasestorage.app",
    messagingSenderId: "419707199929",
    appId: "1:419707199929:web:9638351c9a3d8124151668",
    measurementId: "G-5LGBJGRP44"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
const database = getDatabase(app);

// Exporta as funções e variáveis necessárias
export { database, ref, set, onValue, push }; // Adicione 'push' aqui