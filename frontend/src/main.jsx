import React, { useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Temp from '../pages/Temp.jsx';


export const LoginContext = createContext({ isLoggedIn: false, loading: false, subjects:[] });

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [subjects, setSubjects] = useState([]);
  return (
    <LoginContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      loading,
      setLoading,
      user,
      setUser,
      subjects,
      setSubjects,
    }} >
      <App />
    </LoginContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AppWrapper /> */}\
  <Temp/>
    {/* <Temp/>
    <Table/> */}
  </React.StrictMode>,
)