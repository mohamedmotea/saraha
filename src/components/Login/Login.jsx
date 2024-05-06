import  { useContext, useEffect, useState }  from 'react'
import './Login.css'
import { useFormik } from 'formik'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { userToken } from '../../Context/Token'
import { Helmet } from 'react-helmet-async'
export default function Login() {
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])

  const [errorReg ,setErrorReg] = useState(null)
  const [spinner,setSpinner] = useState(false)
  const navigate = useNavigate()
  const {setToken} = useContext(userToken)
  const validationSchema = Yup.object({
    email:Yup.string().required("البريد الالكتروني مطلوب !! ").email('البريد غير صحيح'),
    password:Yup.string().required("كلمة المرور مطلوبة !").min(3,'اقل عدد هو 3')
  })
  async function submitFun(values){
    setSpinner(true)
    await axios.post('https://sarahaapp-bhyh.onrender.com/api/v1/auth/signIn', values )
   .then((res)=> {
    if(res.data.success){
      navigate('/profile')
      setToken(res.data.token)
    }
    localStorage.setItem('token',res.data.token)
    setSpinner(false)
  })
   .catch((err)=> {
    err.response.data.errMsg ? setErrorReg(err.response.data.errMsg) : setErrorReg(err.response.data.message)
     setSpinner(false)})

  }
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema
    ,
    onSubmit:submitFun
  })

  return (
    <>
      <Helmet>
        <title>تسجيل الدخول</title>
      </Helmet>
      <section className='py-5'>
        <div className="container">
        <h4 className='text-center'>صارحني تسجيل الدخول</h4>
        <hr />
        <form action="" className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
        {errorReg ?   <div className='alert alert-danger p-2 my-3'>{errorReg}</div> : null}

          <label htmlFor="email">ادخل بريدك الالكتروني</label>
          <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="email" className='form-control my-3' />
        {formik.touched.email && formik.errors.email ? <div className='alert alert-danger p-2'>{formik.errors.email}</div> :null}


          <label htmlFor="password">كلمة المرور</label>
          <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" id="password" className='form-control my-2' />
          {formik.touched.password && formik.errors.password ? <div className='alert alert-danger p-2'>{formik.errors.password}</div> :null}

          {spinner ? <button type='button' className='btn btn-success mt-5'> <i className="fa-solid fa-spinner"></i> </button>  : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-primary mt-5'>تسجيل</button> }

        </form>

        </div>
      </section>
    </>
  )
}
