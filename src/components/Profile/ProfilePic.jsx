import { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { userToken } from '../../Context/Token';
import { Helmet } from 'react-helmet-async';

export default function ProfilePic() {

  const {token} = useContext(userToken)
  const [errorReg ,setErrorReg] = useState(null)
  const [isLouding ,setIsLouding] = useState(false)


const SubmitFub = async (values) => {
  
  setIsLouding(true)
    const body = new FormData();
    body.append( "picture", values.picture);
    return axios.patch('https://sarahaapp-bhyh.onrender.com/api/v1/auth/pfp',body,{headers:{token}})
       .then((res)=>{
        setErrorReg(res.data.message)
        setIsLouding(false) })
   .catch((err)=>{
    if(err.response.data.message){

      setErrorReg(err.response.data.message)
    }else{
      setErrorReg(err.response.data.error)
    }
   })
  
}

  const formik = useFormik({
    initialValues:{
      picture:''
    },
    onSubmit:SubmitFub
  })

  return (
  <>
    <Helmet>
        <title>الصورة الشخصيه</title>
      </Helmet>
      <form action='/upload_files' className='mx-auto col-md-6 border p-5 rounded' encType="multipart/form-data" onSubmit={formik.handleSubmit}>
      <h5 className='text-center'>تغير الصورة الشخصية	</h5>
      <hr />
      { errorReg == 'success' ? <div className='alert alert-primary p-2 my-3'>{errorReg}</div> : errorReg ?   <div className='alert alert-danger p-2 my-3'>{errorReg}</div> : null}
      <hr />
        <input type="file" name="picture" id="picture" className='form-control' onChange={(e)=>{
          formik.setFieldValue('picture',e.currentTarget.files[0])
      
        }} />


        {isLouding ? <>
  <button type='button' className='btn  my-5 d-block mx-auto btn-success'> <i className="fa-solid fa-spinner"></i> </button> 
</> : <>
<button type='submit'  className='btn my-5 d-block mx-auto btn-primary'>حفظ التغيرات</button>
</>}
      </form>
  </>
  )
}
