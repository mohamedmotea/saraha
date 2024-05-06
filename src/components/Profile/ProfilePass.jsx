import { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { userToken } from '../../Context/Token';
import { Helmet } from 'react-helmet-async';

export default function ProfilePass() {
  const {token} = useContext(userToken)
  const [errorReg ,setErrorReg] = useState(null)
  const [isLouding ,setIsLouding] = useState(false)


function SubmitFub(values){
  setIsLouding(true)
  return axios.put('https://sarahaapp-bhyh.onrender.com/api/v1/auth',values,{headers:{token}})
  .then((res)=>{
   setErrorReg(res.data.message)
   setIsLouding(false)

  })
  .catch((err)=> {
    if(err.response.data.message){

      setErrorReg(err.response.data.message)
    }else{
      setErrorReg(err.response.data.error)
    }
  })
}

  const formik = useFormik({
    initialValues:{
    newPassword:''

    },
    onSubmit:SubmitFub
  })

  return (
  <>
    <Helmet>
        <title>تغير كلمة السر</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit} className='mx-auto col-md-6 border p-5 rounded'>
      <h5 className='text-center'>تغير كلمة المرور</h5>
      <hr />
      { errorReg == 'success' ? <div className='alert alert-primary p-2 my-3'>{errorReg}</div> : errorReg ?   <div className='alert alert-danger p-2 my-3'>{errorReg}</div> : null}
<div className="position-relative mt-5 mb-3">
    <i className="fa-solid fa-lock position-absolute d-flex h-100 align-items-center start-0 px-3 border-end"></i>
      <input type="password" name="newPassword" id="newPassword" className='form-control' value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
</div>


{isLouding ? <>
  <button type='button' className='btn  my-5 d-block mx-auto btn-success'> <i className="fa-solid fa-spinner"></i> </button> 
</> : <>
<button type='submit'  className='btn my-5 d-block mx-auto btn-primary'>حفظ التغيرات</button>
</>}
    </form>
  </>
  )
}
