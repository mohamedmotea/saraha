import React from 'react'
import './Explain.css'
import step1 from '../../assets/step1.svg'
import step2 from '../../assets/step2.svg'
import step3 from '../../assets/step3.svg'
export default function Explain() {
  const steps = [
    {image:step1, title:"انشاء حساب صراحة",para:"يمكنك تسجيل حساب عبر بريدك الإلكتروني او الحسابات الإجتماعية بسهولة"},
    {image:step2, title:"مشاركة رابط صراحة",para:"عند حصولك على الرابط الخاص بك يمكنك نشره عبر مواقع التواصل الإجتماعي لتحصل على ملاحظات دون ان تعرف المصدر"},
    {image:step3,title:"صارحني رسائلي إقرأ ما كتبه الناس عنك",para:"عند دخولك لحسابك ستجد كل الملاحظات التي قام بكتابها أصدقائك عنك ، أنت وحدك من يمكنه قرائتها"}

  ]
  return (
    <>
    <section id='explain' className='py-5 d-flex align-items-center'>
      <div className="container text-center py-5">
              <h2 className='mb-4'>شرح موقع بصراحة</h2>

    <div className="row m-0 my-5 ">
    
        {steps.map((step,index)=>{
          return <div className="col-md-4" key={index}>
              <img src={step.image} className='w-25' alt='step' />
              <h6 className='my-3 fw-bold'>{step.title}</h6>
              <p className='text-black-50'>{step.para}</p>
          </div>
        })}


    </div>

      </div>

    </section>
    </>
  )
}
