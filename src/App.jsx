
import Home from './components/Home/Home';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import { useContext, useEffect } from 'react';
import { userToken } from './Context/Token';
import ProtectenRoute from './components/ProtectenRoute/ProtectenRoute';
import Messages from './components/Messages/Messages';
import ProfilePass from './components/Profile/ProfilePass';
import SendMsg from './components/SendMsg/SendMsg';
import ProfilePic from './components/Profile/ProfilePic';
import { HelmetProvider } from 'react-helmet-async';
import Contact from './components/Contact/Contact';
import Notfound from './components/Notfound/Notfound';


function App() {


const router = createHashRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login/>},
    {path:"/sendMessage/:id",element:<SendMsg/>},
    {path:"/#/sendMessage/:id",element:<SendMsg/>},
    {path:"/messages",element:<ProtectenRoute><Messages/></ProtectenRoute> },
    {path:"/profile",element:<ProtectenRoute><Profile/></ProtectenRoute> },
    {path:"/profilePass",element:<ProtectenRoute><ProfilePass/></ProtectenRoute> },
    {path:"/profilePic",element:<ProtectenRoute><ProfilePic/></ProtectenRoute> },
    {path:"/contact",element:<Contact/> },
    {path:"*",element:<Notfound/> },


  ]}
])
let {setToken} = useContext(userToken)
  

useEffect(()=>{
    if(localStorage.getItem('token') !== null){
        setToken(localStorage.getItem('token'))
  
    }
  
})

  return (
    <>
    <HelmetProvider>
  <RouterProvider router={router}/>
    </HelmetProvider>
    </>
  )
}

export default App
