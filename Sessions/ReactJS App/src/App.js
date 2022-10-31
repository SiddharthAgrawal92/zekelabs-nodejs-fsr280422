import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

function App() {

  const [userList, setUserList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pagination, setPagination] = useState({
    itemsCountPerPage: 2,
    totalItemsCount: null,
    pageRangeDisplayed: 5
  });

  useEffect(() => {
    getUsers(pagination.itemsCountPerPage, 0);
  }, []);

  const getUsers = (limit, skip) => {
    axios.get(`http://localhost:8080/users?limit=${limit}&skip=${skip}`).then(res => {
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
    </div>
  );
}

export default App;
