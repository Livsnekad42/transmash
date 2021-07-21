import React from 'react';
import './App.css';
import axios from "axios";

let config = {
  baseURL: ""
}

let http = axios.create(config)

function App() {

  function handleInput(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let user = {
      names: 'Иванов Иван Иваныч',
      age: 99,
      id: 50,
      accuracy: 98
    };
    axios.get('http://localhost:3000/post-test').then(resp => console.log(resp));
  }

  return (
    <div className="App">
      <button onClick={handleInput}>123</button>
    </div>
  );
}

export default App;
