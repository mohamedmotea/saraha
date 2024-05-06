import  { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { userToken } from '../../Context/Token';
import { Helmet } from 'react-helmet-async';

export default function ProfileForm({name,email}) {
  const {token} = useContext(userToken)
  const [errorReg ,setErrorReg] = useState(null)
  const [isLouding ,setIsLouding] = useState(false)

function SubmitFub(values){
  return axios.put('https://sarahaapp-bhyh.onrender.com/api/v1/auth',values,{headers:{token}})
  .then((res)=>{
    setIsLouding(true)
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
      userName:name,
      email:email,
      gender:'ذكر',

    },
    onSubmit:SubmitFub
  })

  return (
    <>
      <Helmet>
        <title>الملف الشخصي</title>
      </Helmet>
    <form onSubmit={formik.handleSubmit} className='mx-auto col-md-6 border p-5 rounded'>
      <h5 className='text-center'>أعدادات ملفي</h5>
      <hr />
      { errorReg == 'success' ? <div className='alert alert-primary p-2 my-3'>{errorReg}</div> : errorReg ?   <div className='alert alert-danger p-2 my-3'>{errorReg}</div> : null}
<div className="position-relative mt-5 mb-3">
    <i className="fa-solid fa-user position-absolute d-flex h-100 align-items-center start-0 px-3 border-end"></i>
      <input type="text" name="userName" id="userName" className='form-control' value={formik.values.userName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
</div>

<div className="position-relative my-3">
    <i className="fa-solid fa-envelope position-absolute d-flex h-100 align-items-center start-0 px-3 border-end"></i>
      <input type="text" name="email" id="email" className='form-control' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
</div>

<select value={formik.values.gender} name="gender" id="gender" className='form-control text-center' role='button' onBlur={formik.handleBlur} onChange={formik.handleChange}>
  <option value='ذكر' label="ذكر"  >ذكر</option>
  <option value="انثي" label="انثي">انثي</option>
</select>
{isLouding ? <>
  <button type='button' className='btn btn-success mt-5'> <i className="fa-solid fa-spinner"></i> </button> 
</> : <>
<button type='submit' className='btn my-5 d-block mx-auto btn-primary'>حفظ التغيرات</button>
</>}
    </form>
    </>
  )
}
