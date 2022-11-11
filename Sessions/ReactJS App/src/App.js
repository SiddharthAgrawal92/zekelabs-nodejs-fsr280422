import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

//cookies
//httpOnly 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'null') {
      setIsLoggedIn(true);
    }
  }, [])

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      if (err.response?.status === 401) {
        // setIsLoggedIn(false);
        // localStorage.setItem('isLoggedIn', null);
        if (err.config && err.config.url && (err.config.url !== 'http://localhost:8080/auth/login' ||
          err.config.url !== 'http://localhost:8080/auth/refresh') && !err.config.makeCall) {
          err.config.makeCall = true;
          //refresh token on API failure
          axios.get('http://localhost:8080/auth/refresh', { withCredentials: true }).then(res => {
            if (res.status === 200 && res.data.msg) {
              return axios(err.config);
            }
          })
        }
      }
      return Promise.reject(err);
    }
  );

  //user credentials
  // "userName": Hello123@gmail.com
  // "password": Welcome@123#
  const handleLogin = () => {
    axios.post(`http://localhost:8080/auth/login`, {
      userName: userName,
      password: password
    }, { withCredentials: true }).then(res => {
      if (res.status === 200 && res.data) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
      }
    })
  }

  return (
    <>
      {
        isLoggedIn ?
          <>
            <button onClick={() => {
              setIsLoggedIn(false);
              localStorage.setItem('isLoggedIn', null);
            }}>Logout</button>
            <Router>
              <Navigation />
              <Content />
            </Router>
          </>
          :
          <>
            <div>
              <span>UserName: </span> <input onChange={(e) => {
                setUserName(e.target.value);
              }} type="text"></input>
            </div>
            <div>
              <span>Password: </span> <input onChange={(e) => {
                setPassword(e.target.value);
              }} type="password"></input>
            </div>
            <button onClick={handleLogin}>Login</button>
          </>
      }
    </>
  )
}

const Navigation = () => (
  <ul>
    <li>
      <Link to="/">Homepage</Link>
    </li>
    <li>
      <Link to="/players">Players</Link>
    </li>
  </ul>
)

const Content = () => (
  <Routes>
    <Route exact path="/" element={<Homepage />} />
    <Route path="/players/*" element={<Players />} />
  </Routes>
)

const Homepage = () => {

  const [userList, setUserList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pagination, setPagination] = useState({
    itemsCountPerPage: 2,
    totalItemsCount: null,
    pageRangeDisplayed: 5
  });

  useEffect(() => {
    getUsers(2, 0);
  }, [])

  const getUsers = (limit, skip) => {
    axios.get(`http://localhost:8080/users?limit=${limit}&skip=${skip}`, {
      withCredentials: true
    }).then(res => {
      if (res.status === 200 && res.data) {
        if (res.data.userList) {
          setUserList(res.data.userList);
        }
        if (res.data.totalRecords) {
          const paginationCopy = Object.assign({}, pagination);
          paginationCopy.totalItemsCount = res.data.totalRecords;
          setPagination(paginationCopy);
        }
      }
    })
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    // page 1 = 0
    // page 2 = 2 --> (2 * 2) - 2 | ((2-1) * 2)
    // page 3 = 4 --> (3 * 2) - 2 | ((3-1) * 2)
    const skip = (pageNumber * pagination.itemsCountPerPage) - pagination.itemsCountPerPage;
    // const skip = ((pageNumber - 1) * pagination.itemsCountPerPage);
    getUsers(pagination.itemsCountPerPage, skip);
  }

  const deleteUser = (userId, index) => {
    axios.delete(`http://localhost:8080/users/${userId}`).then(res => {
      if (res.status === 200) {
        //updating the list in the view
        const userListCopy = Object.assign([], userList);
        userListCopy.splice(index, 1);
        setUserList(userListCopy);

        //pagination re-setting on delete of an item
        const paginationCopy = Object.assign({}, pagination);
        paginationCopy.totalItemsCount = paginationCopy.totalItemsCount - 1;
        setPagination(paginationCopy);

        //page redirection on item delete
        const previousPage = activePage - 1;
        if (paginationCopy.totalItemsCount <= (previousPage * paginationCopy.itemsCountPerPage)) {
          setActivePage(previousPage);
          getUsers(paginationCopy.itemsCountPerPage, ((previousPage - 1) * paginationCopy.itemsCountPerPage))
        }
      }
    })
  }

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

  return (
    <div>
      {/* <button onClick={createUser}>Create User</button> <br /> */}
      <h3>Users List</h3>
      <hr style={{ border: '1px solid black' }}></hr>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {
            userList.length ?
              userList.map((user, index) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.address}</td>
                    <td> <button onClick={() => {
                      deleteUser(user._id, index)
                    }}>X</button></td>
                  </tr>
                )
              }) :
              'No Data Found'
          }
        </tbody>
      </table>
      <div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={pagination.itemsCountPerPage}
          totalItemsCount={pagination.totalItemsCount}
          pageRangeDisplayed={pagination.pageRangeDisplayed}
          onChange={handlePageChange}
        />
      </div>
      <br />
      <br />
      <video id="video" width="50%" controls muted="muted" autoPlay>
        <source src='http://localhost:8080/video' type='video/mp4' />
      </video>
    </div>
  );
}

const Players = () => {

  const [player, setPlayer] = useState({});
  const [totalRecords, setTotalRecords] = useState(0);
  const skip = useRef(0);

  useEffect(() => {
    getPlayer();
  }, []);

  const getPlayer = () => {
    setPlayer({});
    axios.get(`http://localhost:8080/players?skip=${skip.current}&limit=1`, {
      withCredentials: true
    }).then(result => {
      if (result.status === 200
        && result.data
        && result.data.playerList
        && result.data.playerList.length
        && result.data.totalRecords) {
        setPlayer(result.data.playerList[0]);
        setTotalRecords(result.data.totalRecords);
      }
    })
  }

  return (
    <>
      {
        Object.keys(player).length ?
          <>
            <h3>Name: {player.name}</h3>
            <h3>Sport: {player.sport}</h3>
            <h3>Rank: {player.rank}</h3>
            <img src={`http://localhost:8080/public/images/${player.name}.jpeg`} />

            <button disabled={skip.current === 0} onClick={() => {
              skip.current = skip.current - 1;
              getPlayer();
            }}>Previous</button> &nbsp;&nbsp;&nbsp;
            <button disabled={totalRecords === skip.current + 1} onClick={() => {
              skip.current = skip.current + 1;
              getPlayer();
            }}>Next</button>
          </>
          :
          'No Data Found!'
      }
    </>
  )
}


export default App;
