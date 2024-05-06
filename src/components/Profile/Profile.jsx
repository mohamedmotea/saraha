import  { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { userToken } from '../../Context/Token'
import axios from 'axios'
import avatar from '../../assets/avatar.webp'
import { useQuery } from 'react-query';
import ProfileForm from './ProfileForm'
import { MagnifyingGlass } from 'react-loader-spinner'
import ProfilePass from './ProfilePass'
import { Link } from 'react-router-dom'
import ProfilePic from './ProfilePic'


export default function Profile() {
const {token} = useContext(userToken)
const [form,setForm] = useState('profileForm')

function getProfile () {
return axios.get('https://sarahaapp-bhyh.onrender.com/api/v1/user',{
    headers:{
      token
    }
  }).then((res)=>res)
  .catch((err)=> err)
}

const {data,isLoading,refetch} = useQuery('profileData',getProfile,{
  cacheTime:250000
})
useEffect(()=>{
  window.scrollTo({
    top:0
  })
  },[])

  {data?.data?.data?.userName == undefined ? refetch() : ''}
  return (
    <>
    <section id='profile' className='pb-5'>

      {isLoading  ? <>

      <section className='bg-dark d-flex justify-content-center align-items-center'>

      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
        />
      </section>
      </> : <>
      
        <div className="profileInfo d-flex align-items-center flex-column py-5 mb-5">
        
        {data?.data?.data.profilePic ? <>
      <img src={data?.data?.data.profilePic.secure_url} className='rounded-circle'  width={100} height={100}/>
        
        </> : <>
      <img src={avatar}  width={80} height={80}/>
        
        </>}
        <h1 className='fw-bold'>{data?.data?.data?.userName}</h1>
        {/* <Link className='my-3' to={`https://sarahaapp-bhyh.onrender.com/api/v1/user/${data?.data?.data?._id}`} >{`http:///api/v1/user/${data?.data?.data?._id}`}</Link> */}
        <Link className='my-3 text-center' to={`https://mote3-saraha.netlify.app/#/sendMessage/${data?.data?.data?._id}`} rel="noreferrer" target='_blank'>{`https://mote3-saraha.netlify.app/#/sendMessage/${data?.data?.data?._id}`}</Link>

      <p className='text-danger fw-bold'>تغيير المعلومات الشخصية</p>
      
        </div>
      <div className="container">
      
        <div className='w-50 mx-auto px-5 rounded py-3 d-flex justify-content-evenly'>
          <button className={`${form == 'profileForm' ? 'btn-primary' : 'btn-success'} btn px-5`} onClick={()=>{setForm('profileForm')}}>الملف</button>
        <button className={`${form == 'profilePass' ? 'btn-primary' : 'btn-success'} btn px-5`} onClick={()=>{setForm('profilePass')}}>الحساب</button>
        <button className={`${form == 'profilePic' ? 'btn-primary' : 'btn-success'} btn px-5`} onClick={()=>{setForm('profilePic')}}>الصورة</button>
        </div>
  {form == 'profileForm' ? <>
  <ProfileForm name={data?.data?.data?.userName} email={data?.data?.data?.email}/>
  </> : form == 'profilePass' ? <>
    <ProfilePass/>
  </> : form == 'profilePic' ? <ProfilePic/>  : refetch()}
      
      </div>
      
      </>}

    </section>
    </>
  )
}
