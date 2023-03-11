import React from 'react'

import '../../assets/css/response.css'

const Response = (props) => {
  const processImage = (e) => {
    e.preventDefault();
  }

  return (
    <div className='response-wrapper'>
        <h2 className='accent'>
            Poll Option
        </h2>
        <div className='response'>
          <input name={props.uuid} onChange={(e) => props.handle(e, props.id, e.target.value)} type='text' placeholder='Option'/>
        </div>
    </div>
  )
}

export default Response