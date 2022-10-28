import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const createUser = async () => {
    //this won't work by default since CORS policy is enabled in the server so that has to be 
    //configured in our NodeJS server

    axios.post('http://localhost:8080/users', {
      "name": "Andrew Adams",
      "age": 13,
      "address": "FN, Germany"
    }).then(res => {
      if (res.status === 201) {
        alert('User is Successfully Created');
      }
    });

    // axios.get('http://localhost:8080/users?skip=0&limit=4').then(res => {
    //   console.log('GET API Status: ', res.status);
    //   console.log('GET API Data: ', res.data);
    // });

    // const result = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    // console.log('Response from API: ', result.data);
  }

  const getFirst2 = () => {
    axios.get('http://localhost:8080/users?skip=0&limit=2').then(res => {
      console.log('GET API Status: ', res.status);
      console.log('GET API Data: ', res.data);
    });
  }

  const getSecond2 = () => {
    axios.get('http://localhost:8080/users?skip=2&limit=2').then(res => {
      console.log('GET API Status: ', res.status);
      console.log('GET API Data: ', res.data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createUser}>Create User</button> <br />
        <button onClick={getFirst2}>Get 1st 2 Users Users</button><br />
        <button onClick={getSecond2}>Get 2nd 2 Users Users</button>
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
