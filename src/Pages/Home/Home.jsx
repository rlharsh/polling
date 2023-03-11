import React from 'react'
import Header from '../../Components/Header/Header'
import Lottie from 'react-lottie-player'

import '../../assets/css/home.css'
import computerJson from '../../assets/images/73812-cloud-computing-security.json'
import demographicJson from '../../assets/images/93857-abstract-modular-cube-1.json'
import shiftingJson from '../../assets/images/93227-fading-cubes-loader-2.json'
import fadingJson from '../../assets/images/58509-shifting-cubes-2.json'

import * as Icon from 'react-feather'

const Home = () => {

  return (
    <div className='wrapper'>
        <section className='hero-home'>
            <div className='hero-home__left'>
              <h2 className='script accent'>
              Your data when you need it the most
              </h2>
              <p className='text'>
              Get the insights you need, without the risk. Poll.me's secure, anonymous polling solution delivers valuable content, without compromising your privacy.
              </p>
              <div className='hero-home__left__button-wrapper'>
                <button className='button button__highlight'>
                  <Icon.PlusSquare size={26} />Create a Poll
                </button>
                <button className='button'>
                  View a Poll
                </button>
              </div>
            </div>
            <div className='hero-home__right'>
              <div className='hero-home__right__wrapper'>
                <div className='hero-home__right__wrapper__top'>
                  <Lottie
                    loop
                    animationData={computerJson}
                    play
                    style={{ width: '80%', height: '80%' }}
                    />
                </div>
                <div className='hero-home__right__wrapper__bottom'>
                  <p className='text italic'>"Fast and simple poll submission, great results!"</p>
                </div>
              </div>
            </div>
        </section>
        <div className='hero-about__header'>
            <h2>About</h2>
        </div>
        <section className='hero-about'>
          <h2 className='script' data-aos="fade-up">
            Anonymous polling at your fingertips.
          </h2>
          <p className='text' data-aos="fade-up">
            By using anonymous polling you will get truthful responses from your target audience, as it virtually eliminates the worry of retaliation.
          </p>

        <section className='card-container'>
          <div className='card' data-aos="fade-up">
            <div className='card__image'>
            <Lottie
                    loop
                    animationData={demographicJson}
                    play
                    style={{ width: '100%', height: '100%' }}
                    />
            </div>
            <div className='card__description'>
              <p className='text'>Voluntary demographic data can assist you with precise targeting options.</p>
            </div>
          </div>
          <div className='card' data-aos="fade-up" data-aos-delay="200">
          <div className='card__image'>
            <Lottie
                    loop
                    animationData={shiftingJson}
                    play
                    style={{ width: '100%', height: '100%' }}
                    />
            </div>
            <div className='card__description'>
              <p className='text'>Keep your poll safe with password protection, ensuring that only authorized persons are able to view.</p>
            </div>
          </div>
          <div className='card' data-aos="fade-up" data-aos-delay="400">
          <div className='card__image'>
            <Lottie
                    loop
                    animationData={fadingJson}
                    play
                    style={{ width: '100%', height: '100%' }}
                    />
            </div>
            <div className='card__description'>
              <p className='text'>Allow poll responders a chance to respond to your poll, giving you more insight, and a clear set of data.</p>
            </div>
          </div>
        </section>

        </section>
    </div>
  )
}

export default Home