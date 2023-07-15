import React, { useState } from 'react'
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify'
import { resetPassword } from '../../features/auth/authService';


const initialState = {
  password: '',
  password2: '',
}

const Reset = () => {

  const [formData, setformData] = useState(initialState)
  const {password, password2} = formData

  const {resetToken} = useParams()

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setformData({...formData, [name]: value})
  }

  const reset = async (e) => {
    e.preventDefault()

    if(password.length < 6){
      return toast.error('Passwords must be up to 6 characters')
    }
    if(password !== password2){
      return toast.error('Passwords do not match')
    }
    const userData = {
      password, password2
    }

    try {
      const data = await resetPassword(userData, resetToken)
      toast.success(data.message)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <div className={`container ${styles.auth}`}>

    <Card>

      <div className={styles.form}>
        <div className='--flex-center'>
          <MdPassword size={35} color='#999'/>
        </div>
        <h2>Reset Password</h2>
        <form onSubmit={reset}>
          <input type='password' placeholder='New Password' required name='password' value={password} onChange={handleInputChange}/>
          <input type='password' placeholder='Confirm New Password' required name='password2' value={password2} onChange={handleInputChange}/>
          <button type='submit' className='--btn --btn-secondary --btn-block'>Reset Password</button>
        </form>
        <span className={styles.register}>
          <Link to='/'>-Home-</Link>
          <p> &nbsp;  &nbsp; </p>
          <Link to='/login'>-Login-</Link>
        </span>
      </div>

    </Card>

  </div>
  )
}

// const Text = ({text}) => {
//   return (
//     <div className='--my-1'>
//       <p className='--color-black'>{text}</p>
//     </div>
//   )
// }

export default Reset