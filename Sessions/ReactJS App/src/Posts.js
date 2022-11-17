import axios from "axios";
import socketClient from 'socket.io-client';
const { useState, useEffect } = require("react")
let socket = socketClient('http://localhost:9000');

const Posts = () => {

    useEffect(() => {
        getAllPosts();
        socket.on('new-post', newPost => {
            setPostsList(prevVal => {
                prevVal = [newPost, ...prevVal];
                return prevVal;
            });
        });

        socket.on('deleted-post', postId => {
            setPostsList(prevVal => {
                let postFound = prevVal.findIndex(post => post._id === postId);
                if (postFound > -1) {
                    prevVal.splice(postFound, 1);
                }
                const newVal = Object.assign([], prevVal);
                return newVal;
            });
        });
    }, [])

    const [postsList, setPostsList] = useState([]);

    const getAllPosts = () => {
        axios.get('http://localhost:8080/posts').then(res => {
            if (res.status === 200 && res.data && res.data.postsList && res.data.postsList.length) {
                setPostsList(res.data.postsList);
            }
        })
    }

    return (
        <>
            <h3>Posts List</h3>
            <hr style={{ border: '1px solid black' }}></hr>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Author Name</th>
                        <th>Designation</th>
                        <th>Post</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        postsList.length ?
                            postsList.map((post) => {
                                return (
                                    <tr>
                                        <td>{post.author}</td>
                                        <td>{post.designation}</td>
                                        <td>{post.article}</td>
                                    </tr>
                                )
                            }) :
                            'No Data Found'
                    }
                </tbody>
            </table>
        </>
    )
}

export default Posts;