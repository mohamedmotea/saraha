
import './Home.css'
import Hero from './../Hero/Hero';
import Explain from './../Explain/Explain';
import { Helmet } from 'react-helmet-async';
export default function Home() {
  return (
    
    <>
      <Helmet>
        <title>صارحني</title>
      </Helmet>
    <Hero />
    <Explain />
    </>
  )
}
