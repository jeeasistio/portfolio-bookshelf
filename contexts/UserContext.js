import router from 'next/router'
import { createContext, useState, useEffect } from 'react';
import nookies from 'nookies'
import axios from 'axios'

const cookieRole = nookies.get()['user-role'];

const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [userRole, setUserRole] = useState('guest');
  
  useEffect(() => {
    if (cookieRole) {
      setUserRole(cookieRole);
    }
  }, [])
  
  const logoutFunc = () => {
    setUserRole('guest');
    axios.post('/api/auth/logout')
      .then(_ => {
        router.push('/auth/reader/login');
      })
  }
  
  return (
    <UserContext.Provider value={{
      userRole,
      setUserRole,
      logoutFunc
    }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider };
export default UserContext;