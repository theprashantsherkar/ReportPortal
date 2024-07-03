import React, { useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Temp from './Temp.jsx';
import Table from '../components/Table.jsx';
// import { Tab } from 'bootstrap';


export const LoginContext = createContext({ isLoggedIn: false, loading: false });

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  return (
    <LoginContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      loading,
      setLoading,
      user,
      setUser
    }} >
      <App />
    </LoginContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
    {/* <Temp/>
    <Table/> */}
  </React.StrictMode>,
)