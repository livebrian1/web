import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { selectUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/auth/authService'
import ChangePassword from '../../components/changePassword/ChangePassword'


const EditProfile = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(selectUser)
  const {email} = user

  // if you refresh the edit-profile page all the data will be lost to thats why we just re-route the page to profile
  useEffect(() => {
    if(!email) {
      navigate('/profile')
    }
  }, [email, navigate])

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  }

  const [profile, setProfile] = useState(initialState)
  const [profileImage, setProfileImage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0])
  }

  const saveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Handle Image upload Cloudinary
      let imageURL;
      if (profileImage && (
        profileImage.type === 'image/jpeg' ||
        profileImage.type === 'image/jpg' ||
        profileImage.type === 'image/png'
      )) {
        const image = new FormData()
        image.append('file', profileImage)
        image.append('cloud_name', '')
        image.append('upload_preset', 'r2f5oj4x') //from Cloudinary - unsigned mode

        // First save image to Cloudinary
        const response = await fetch('https://api.cloudinary.com/v1_1/dywrzmp2r/image/upload',
        {method: 'post', body: image}
        )
        const imgData = await response.json()
        imageURL = imgData.url.toString()
      }
        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        }

        const data = await updateUser(formData);
        console.log(data);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      toast.error(error.message)
    }
  }



  return (
    <div className='profile --my2'>
      {isLoading && <Loader/>}
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
                placeholder='Enter a Bio'
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword/>
    </div>
  
  )
}

export default EditProfile