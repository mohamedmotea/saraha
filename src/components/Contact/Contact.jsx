import Lottie from "lottie-react";
import ContactAni from "../../assets/animation/contactAni.json";
export default function Contact() {
  return (
    <>
    <section id='contact' className='py-5'>
      <div className="container">

    <h3 className='h3 fw-bold'><i className ="fa-regular fa-envelope mx-2"></i>تواصل معنا</h3>
    
    <p className='fs-sm col-md-6 mt-4'>هل لديك مشكلة فنية؟ هل تريد إرسال تعليقات حول إحدى الميزات التجريبية؟ هل تحتاج إلى تفاصيل حول خطة أعمالنا؟ دعنا نعرف.
    </p>



<div className="row">
    <form className='col-md-6 my-5'>
      <label htmlFor="email">الحساب الالكتروني :</label>
      <input  className='form-control my-2 py-1' type="email" id='email' name='email' />

      <label htmlFor="comment">التعليق الخاص بك :</label>
      <textarea className='form-control my-2' name="comment" id="comment"></textarea>

      <button type='submit' className='btn btn-primary my-2'>ارسال</button>
    </form>

      <div className="col-md-6">
      <Lottie animationData={ContactAni}style={{height:300}} />
      </div>
</div>
      </div>
    </section>
    
    
    </>
  )
}
