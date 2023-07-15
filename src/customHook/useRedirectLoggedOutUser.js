import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN } from '../features/auth/authSlice'
import { getLoginStatus } from '../features/auth/authService'
import { toast } from 'react-toastify'



const useRedirectLoggedOutUser = (path) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggIn))

            if(!isLoggIn) {
                toast.info('Session Expired, Please login to continue')
                navigate(path)
                return
            }
        }
        redirectLoggedOutUser()
    }, [navigate, path, dispatch])
}

export default useRedirectLoggedOutUser

//This is the Session Expired 