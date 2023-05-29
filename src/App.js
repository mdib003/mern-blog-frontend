import { createContext, useEffect, useState } from "react";
import { BlogNavigation } from "./components/BlogNavigation";
import { CreatePost } from "./components/CreatePost";
import { Post } from "./components/Post";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { Loading } from "./components/Loading";

export const BlogContext = createContext()

function App() {

  const [appValues, setAppValues] = useState({
    userName: '',
    fullName: '',
    loading: true,
    postsList: []
  })

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    profileHandler()   
  }, [])

  const profileHandler = async () => {
    await fetch('/v1/api/profile', {
      method: 'POST',
      credentials: 'include',
    }).then((d) => d.json()).then(async (d) => {
      if (d.userName && d.fullName) {        
        if (location.pathname === '/register' || location.pathname === '/login') {
          navigate('/')
        }
        await postListApiCall()        
        setAppValues((prevState) => (
          { ...prevState, userName: d.userName, fullName: d.fullName, loading: false }
        ))
      } else {
        setAppValues((prevState) => (
          { ...prevState, loading: false, userName: '', fullName: '' }
        ))
        if (location.pathname === '/register') {
          navigate('/register')
        } else {
          navigate('/login')
        }
      }
    }).catch((err) => {
      setAppValues((prevState) => (
        { ...prevState, loading: false }
      ))
      if (location.pathname === '/register') {
        navigate('/register')
      } else {
        navigate('/login')
      }
    });
  }

  const postListApiCall = async () => {
    await fetch('/v1/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then(d => {      
      setAppValues((prevState) => (
        { ...prevState, postsList: d.postsList }
      ))
    });
  }

  return (
    <BlogContext.Provider value={{ appValues, profileHandler }}>
      {!appValues.loading ? <div>
        <BlogNavigation></BlogNavigation>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </div> :
        <Loading />
      }
    </BlogContext.Provider>
  );
}

export default App;
