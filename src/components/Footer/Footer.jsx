import React from 'react'
import './Footer.css'
export default function Footer() {
  const links = [
    {href:'www',icon:"fa-brands fa-facebook-f fs-4"},
    {href:'www',icon:"fa-brands fa-instagram fs-4"},
    {href:'www',icon:"fa-brands fa-whatsapp fs-4"},
    {href:'www',icon:"fa-brands fa-linkedin fs-4"},
  ]
  return (
    <>
    <footer className='py-5 text-center'>
      <ul className='list-unstyled d-flex justify-content-center align-items-center'>
        {links.map((link,index)=>{
          return <li key={index}>
            <a href={link.href} className='mx-2 rounded d-flex align-items-center'>
              <i className={link.icon}></i>
            </a>
          </li>
        })}
    
      </ul>
      <p>جميع الحقوق محفوظة © 2024</p>
      <p className='mt-3'>Copyright © 2024 Developed by Mohamed Motea</p>
    </footer>
    </>
  )
}
