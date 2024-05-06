import  { useEffect, useState } from 'react'
import './Register.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
export default function Register() {

  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])
  const [errorReg ,setErrorReg] = useState(null)
  const [spinner,setSpinner] = useState(false)
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    userName:Yup.string().required("الاسم مطلوب !! ").min(3,"اقل عدد احرف هو 3 ").max(10,"اكبر عدد هو 10"),
    email:Yup.string().required("البريد الالكتروني مطلوب !! ").email('البريد غير صحيح'),
    password:Yup.string().required("كلمة المرور مطلوبة !").min(3,'اقل عدد هو 3')
  })

  async function submitFun(values){
    setSpinner(true)
   await axios.post('https://sarahaapp-bhyh.onrender.com/api/v1/auth/signUp', values )
  .then((res)=> { 
    if(res.data?.success){
      navigate('/Login')
    }

  setSpinner(false) 

}
  
  )
    .catch((err)=>  { 
      console.log('err',err.response.data.message)
      setErrorReg(err.response.data.message);
      setSpinner(false)})

  }
  const formik = useFormik({
    initialValues:{
      userName:'',
      email:'',
      password:''
    },validationSchema
    ,
    onSubmit:submitFun
  })
  
  return (
    <>
      <Helmet>
        <title>تسجيل حساب جديد</title>
      </Helmet>
      <section className='py-5'>
        <div className="container">
          <h4>تسجيل حساب جديد</h4>
        <form onSubmit={formik.handleSubmit} className='border my-5 w-75 p-5 d-flex mx-auto flex-wrap flex-column'>
        {errorReg ?   <div className='alert alert-danger p-2 my-3'>{errorReg}</div> : null}


          <label htmlFor="userName">الاسم :</label>
          <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} name="userName" id="userName" className='form-control my-3' />
        {formik.touched.userName && formik.errors.userName ? <div className='alert alert-danger p-2'>{formik.errors.userName}</div> :null}



          <label htmlFor="email">البريد الالكتروني :</label>
          <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="email"  className='form-control my-3' />
          {formik.touched.email && formik.errors.email ? <div className='alert alert-danger p-2'>{formik.errors.email}</div> :null}

          <label htmlFor="password">كلمة المرور  :</label>
          <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" id="password"  className='form-control my-3' />
          {formik.touched.password && formik.errors.password ? <div className='alert alert-danger p-2'>{formik.errors.password}</div> :null}
    <p>
      هل لديك حساب بالفعل؟
      <Link to="/login" className='mx-2 link-underline-primary'>تسجيل الدخول</Link>
    </p>

    {spinner ? <button type='button' className='btn btn-success mt-5'> <i className="fa-solid fa-spinner"></i> </button>  : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-primary mt-5'>تسجيل</button> }
  
        </form>
        </div>
      </section>
    </>
  )
}
