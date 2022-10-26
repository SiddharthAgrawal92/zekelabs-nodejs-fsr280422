import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const createUser = async () => {
    //this won't work by default since CORS policy is enabled in the server so that has to be 
    //configured in our NodeJS server

    // axios.post('http://localhost:8080/users', {
    //   "name": "Andrew Adams",
    //   "age": 13,
    //   "address": "FN, Germany"
    // }).then(res => {
    //   if (res.status == 201) {
    //     alert('User is Successfully Created')
    //   }
    // })

    const result = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Response from API: ', result.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createUser}>Create User</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
