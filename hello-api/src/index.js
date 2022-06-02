import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// cara untuk menjalankan database server 
/*
1. Pastikan db.json yang didalamnya terdapat data-data sudah ada.
2. Install json-server dengan menggunakan perintah `npm install -g json-server`
3. Jalankan json-server dengan menggunakan perintah `json-server --watch db.json --port 3002`
*/