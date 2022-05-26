import React from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';


const promise = axios.get('http://localhost:3001/persons')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

axios.get('http://localhost:3001/persons').then(response => {
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons} />)
})

const root = ReactDOM.createRoot(document.getElementById('root').render(<App />));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

