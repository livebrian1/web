import React from 'react'
import { logoutUser } from '../../features/auth/authService'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN, selectName } from '../../features/auth/authSlice';


const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // to Specify the Name of the User
  const name = useSelector(selectName)

  const logout = async () => {
    await logoutUser()
    await dispatch(SET_LOGIN(false))
    navigate('/login')
  }
  return (
    <div className='--pad header'>
        <div className='--flex-between'>
            <h3>
                <span className='--fw-thin'>Welcome, </span>
                {/* to Specify the Name of the User */}
                <span className='--color-danger'>{name}</span> 
            </h3>
            <button onClick={logout} className='--btn --btn-danger'>Logout</button>
        </div>
        <hr/>
    </div>
  )
}

export default Header