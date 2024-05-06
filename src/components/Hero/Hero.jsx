import { Link } from 'react-router-dom'
import './Hero.css'
import { useEffect } from 'react'
export default function Hero() {
  useEffect(()=>{
    window.scrollTo({
      top:0
    })
    },[])

  return (
    <section id='hero'>
      <div className="container d-flex align-items-center justify-content-center h-100 flex-column overflow-hidden">
        <h1 className='fw-bold'>صارحني بكل صراحه</h1>
        <p className='my-3 fs-5 animate__animated animate__fadeInLeft text-center'>هل أنت مستعد لمعرفة ملاحظات الناس عنك بدون أن تعرفهم ؟</p>
        <div>
          <button className='btn border mx-2'>   
          <Link className='text-light' to="/login">

          دخول الحساب  
          <i className="fa-solid fa-paper-plane me-1"></i>
          </Link>
          </button>
          <button className='btn border mx-2'>
            <Link className='text-light' to="/register">
              
          تسجيل حساب جديد
           <i className="fa-solid fa-circle-plus me-1"></i>
            </Link>
           </button>
        </div>
      </div>
    </section>
  )
}
