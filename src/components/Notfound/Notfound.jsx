
import Lottie from "lottie-react";
import NotfoundAmi from '../../assets/animation/animation-notfound.json'
import { Helmet } from "react-helmet-async";
export default function Notfound() {
  return (
      <>
      <Helmet>
        <title>صفحة غير موجودة</title>
      </Helmet>
      <section className='py-4 text-center'>
        <h2>Page Not Found !</h2>
      <div className="col-md-5 mx-auto">

<Lottie  animationData={NotfoundAmi} />
</div>
      </section>
      </>
  )
}
