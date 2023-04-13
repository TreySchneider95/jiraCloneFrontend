import './App.css';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import HomePage from './Pages/HomePage';
import BlogPage from './Pages/TicketPage';
import NewTicketPage from './Pages/NewTicketPage';
import NewUserPage from './Pages/NewUserPage';
import LoginPage from './Pages/LoginPage';
import ManageUsersPage from './Pages/ManageUsersPage';
import Layout from './Layouts/Layout';
// import { useAuth } from "./Hooks/Auth";


const urlEndPoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {

  const [ticketList, setTicketList] = useState([]);
  // const auth = useAuth()
  useEffect(() => {
    axios.get(`${urlEndPoint}/tickets/all`)
    .then(function (response) {
      // console.log(response);
      setTicketList(response.data.tickets);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage 
            ticketList={ticketList} 
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
          element: <NewTicketPage 
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
                    // userList={userList}
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
