import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import HomePage from './Pages/HomePage';
import BlogPage from './Pages/BlogPage';
import NewBlogPage from './Pages/NewBlogPage';
import NewUserPage from './Pages/NewUserPage';
import LoginPage from './Pages/LoginPage';
import ManageUsersPage from './Pages/ManageUsersPage';
import Layout from './Layouts/Layout';
import { useAuth } from "./Hooks/Auth";


const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {

  const [blogList, setBlogList] = useState([]);
  const [userList, setUserList] = useState([])
  const auth = useAuth()
  console.log(auth.isAdmin)
  useEffect(() => {
    axios.get(`${urlEndPoint}/blogs/all`)
    .then(function (response) {
      // console.log(response);
      setBlogList(response.data.blogs);
    })
    .catch(function (error) {
      console.log(error);
    });


    axios.get(`${urlEndPoint}/users/all`)
    .then(function(resp){
      console.log('ooooooooooooo')
      setUserList(resp.data.users)
    })
    .catch(function(err){
      console.log(err)
    })
  },[])


  console.log(userList)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage 
            blogList={blogList} 
            urlEndPoint={urlEndPoint} 

          />

        },
        { 
          path: "blog/:id",
          element: <BlogPage 
              urlEndPoint={urlEndPoint} 
              />
        },
        { 
          path: "new-blog",
          element: <NewBlogPage 
              urlEndPoint={urlEndPoint} 
              />
        },
        {
          path: "register",
          element: <NewUserPage
              urlEndPoint={urlEndPoint}
              />
        },
        {
          path: "login",
          element: <LoginPage/>
        },
        {
          path: "manage-users",
          element: <ManageUsersPage
                    userList={userList}
                    urlEndPoint={urlEndPoint}
                    />
        }
      ]

    }
  ])


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
