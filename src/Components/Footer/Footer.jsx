import React from 'react'

import '../../assets/css/footer.css'


const Footer = () => {
  return (
    <section className='footer-wrapper'>
        <div className='footer-wrapper__left'>
            <p>Home</p>
            <p>Privacy Policy</p>
            <p>Legal Notices</p>
            <p>Mission Statement</p>
            <p>Contact Us</p>
        </div>
        <div className='footer-wrapper__right'>
            <p>Developedb by: PandaWeb.io</p>
            <p>admin@pandaweb.io</p>
        </div>
    </section>
  )
}

export default Footer