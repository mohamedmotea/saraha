import  { useState } from 'react'
import './SendMsg.css'
import avatar from '../../assets/avatar.webp'
// import { userToken } from '../../Context/Token'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import { MagnifyingGlass } from 'react-loader-spinner'
export default function SendMsg() {
  // const {token} = useContext(userToken)
const {id} = useParams()
const [loud ,setIsLoud] = useState(false)
const [msgSuccess ,setMsgSuccess] = useState('')

function getProfile () {

return axios.get(`https://sarahaapp-bhyh.onrender.com/api/v1/user/${id}`,{
  
  }).then((res)=>  res )
  .catch((err)=> err)
}

const {data,isLoading,refetch} = useQuery('userData',getProfile,{
  cacheTime:250000
})
async function submitFun(values){
  setIsLoud(true)
  await axios.post(`https://sarahaapp-bhyh.onrender.com/api/v1/message/${id}`,values)
  .then((res)=>{
    setIsLoud(false);
    setMsgSuccess(res.data.message);
    setTimeout(()=>{
      window.location.reload()
    },2000)
    
  })
  .catch((err)=>{
    setIsLoud(false);
    setMsgSuccess(err.response.data.error);
    
    console.log(err.response.data.error)})
}
const formik = useFormik({
  initialValues:{
    content:''
  },
  onSubmit:submitFun

})

{data?.data?.msg != 'success' ? refetch()  : null}

  return (
    <>
      <section id='sendMsg' className='pb-5'>
{(isLoading ) ? <>
  <section className='bg-dark d-flex justify-content-center align-items-center '>
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
</>
: <>
      <div className="profileMsg d-flex align-items-center flex-column py-5 mb-5">
      {data?.data?.data.profilePic ? <>
      <img src={data?.data?.data.profilePic.secure_url} className='rounded-circle'  width={100} height={100}/>
        </> : <>
      <img src={avatar}  width={80} height={80}/>
        
        </>}

      <h2 className='fw-bold'>{data?.data?.data.userName}</h2>

      <Link to={`https://mote3-saraha.netlify.app/#/sendMessage/${data?.data?.data._id}`} rel="noreferrer" target='_blank'>https://mote3-saraha.netlify.app/#/sendMessage/{data?.data?.data._id}</Link>
      </div>
<div className="container">
 {msgSuccess ? <p className='alert alert-primary text-center w-75 mx-auto'>{msgSuccess}</p> : ''}
      <form onSubmit={formik.handleSubmit} className='w-50 mx-auto rounded border py-5 px-3 '>
      <h5 className='text-center py-3  rounded-pill mb-4'>أكتب رسالة إلى {data?.data?.data.userName} دون ان يعرفك</h5>
        <textarea 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.content}
        name="content" id="content" className='form-control py-3 border-lg' placeholder={`هناك شيء تريد قوله لـ ${data?.data?.data.userName} ، بدون ان يعرفك ؟ أكتب هنا`}></textarea>

        {loud ? <> 
          <button type='button' className='btn d-block mx-auto btn-success mt-5'> <i className="fa-solid fa-spinner"></i> </button> 
        </>
      : <>
        <button type='submit' className='btn btn-primary d-block mx-auto my-4'>أرسل الان</button>
      </>  
      }

      </form>
      </div>
</>

}

</section>
    </>
  )
}
