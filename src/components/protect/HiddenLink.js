import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../features/auth/authSlice';


export const ShowOnLogin = ({children}) => {
    const isLoggeIn = useSelector(selectIsLoggedIn)

    if(isLoggeIn){
      return <>
      {children}
      </>
    }
};

export const ShowOnLogout = ({children}) => {
    const isLoggeIn = useSelector(selectIsLoggedIn)

    if(!isLoggeIn){
      return <>
      {children}
      </>
    }
    return null
};

// This is the Components for stay loggedin even you refresh the page (Loggin Status)