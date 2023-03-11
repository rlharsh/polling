import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header/Header'
import axios from 'axios'

import { v4 as uuidv4 } from 'uuid'
import Response from '../../Components/Response/Response'
import * as Icon from 'react-feather'

import '../../assets/css/create.css'
import ReCAPTCHA from 'react-google-recaptcha'

import Crypto from "crypto-js";

const Create = () => {


  const [pollQuestion, setPollQuestion] = useState('My new poll!')
  const [pollAnswers, setPollAnswers] = useState([])
  const [pollPrimaryKey, setPollPrimaryKey] = useState('');
  const [pollSecondaryKey, setSecondaryKey] = useState('');
  const [pollExpiry, setPollExpiry] = useState(null);
  const [pollSubmitted, setPollSubmitted] = useState(false);
  const [pollCode, setPollCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const captchaRef = useRef(null)

  const handleQuestionChange = (e) => {
    setPollQuestion(e);
    if (e === '') {
      setPollQuestion('My new poll!')
    }
  }

  useEffect(() => {
    generateResponse();
  }, []);

  const generateResponse = () => {
    addPollItem();
  }

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }

  const tokenInfo = (token) => {
    return {
    secret:"6LfuZXIkAAAAAC0Paqoh0PFh4EvSLKgK8jrj8pCN",
    token
    }
  }

  const verifyToken = async (token) => {
    let newToken = tokenInfo(token);

    try{
    let response = await axios.post(`http://localhost:3000/verify-token`, { newToken }, headers);
    return response.data;
    }catch(error){
    console.log("error ",error);
    }
}

  const addPollItem = () => {
    setPollAnswers([...pollAnswers, { uuid: uuidv4(), answer: '' }])
  }

  const renderControls = () =>
    pollAnswers.map((pollAnswer) => (
      <Response key={pollAnswer.uuid} id={pollAnswer.uuid} handle={handleChangeQuestion} />
    ))

  const renderSuccess = () => {
    if (pollSubmitted) {
      return(
        <div className='poll-success'>
          <div className='poll-success__wrapper'>
            <h2 className='accent'>Your poll has been submitted.</h2>
            <p>
            Please find below the necessary information to access your poll. We kindly advise you to store this information in a secure location, as it will no longer be available after leaving this page. You are free to share the link provided with anyone. It is important to note that in order for others to access your poll, the encryption key you created during submission must be included.
            </p>
            <p>
            Please note that we are unable to offer assistance for lost encryption keys, as this sensitive information is never communicated to our servers.
            </p>
            <div className='poll-success__wrapper__code'>
              <p>
                Code:
              </p>
              <h3 className='accent'>
                {pollCode}
              </h3>
            </div>
            <button className='button button__highlight' onClick={ () => 
              {
                navigator.clipboard.writeText(pollCode);
                setCodeCopied(true);
              } 
            }>Copy to Clipboard</button>
            <button className='button'>Return Home</button>
            {
              codeCopied ? <p className='accent'>Code copied to clipboard!</p> : null
            }
          </div>
        </div>
      )
    }
  }

    const handleChangeQuestion = (e, id) => {
      setPollAnswers(
        pollAnswers.map((item) =>
          item.uuid === id
            ? { ...item, answer: e.target.value }
            : item
        )
      )
    }

    const encryptText = (e, key) => {
      return Crypto.AES.encrypt(e, key).toString();
    }

    const decryptText = (e, key) => {
      let bytes = Crypto.AES.decrypt(e, key);
      console.log(bytes.toString(Crypto.enc.Utf8));
    }

    const URL = 'http://127.0.1:3000/api/poll/store';

    const handleSubmit = async (e) => {
      e.preventDefault();

      let pollKey = '';

      if (pollPrimaryKey === pollSecondaryKey) {
        pollKey = pollPrimaryKey;
      }

      let token = captchaRef.current.getValue();
      
      if (token) {
        let valid_token = await verifyToken(token);

        if (valid_token.success) {
          const formData = new FormData();
          formData.append('question', encryptText(pollQuestion, pollKey));
          formData.append('expiry', pollExpiry);

          pollAnswers.forEach((value) => {
            formData.append('responses', encryptText(JSON.stringify(value), pollKey));
          });

          axios.post(URL, formData, {
            headers
          })
          .then(res => {
            setPollSubmitted(true);
            setPollCode(res.data.message);
          })
          .catch(err => {
            console.log('Error: ' + err);
          })
        }
      }
    }

  const updatePrimaryKey = (e) => {
    setPollPrimaryKey(e);
  }

  const updateSecondaryKey = (e) => {
    setSecondaryKey(e);
  }
  

  return (
    <div className='wrapper'>
        <form className='create-wrapper'>
          <div className='top-header'>
            <h1 className='accent'>
              {pollQuestion}
            </h1>

            <input 
              type='text' 
              className='full-width' 
              placeholder='What is my favorite color?' 
              onChange={
                  (e) => handleQuestionChange(e.target.value) 
              } required 
            />

            <h2 className='accent'>
              Secret Key (needed to access the survey):
            </h2>

            <input 
              type='password' 
              className='full-width' 
              placeholder='Decryption Key' 
              onChange={
                  (e) => { updatePrimaryKey(e.target.value) }
              } required 
            />

            <h2 className='accent'>
              Confirm Secret Key (passwords must match):
            </h2>

            <input 
              type='password' 
              className='full-width' 
              placeholder='Decryption Key' 
              onChange={
                  (e) => { updateSecondaryKey(e.target.value) }
              } required 
            />

            <p>
              Your password is the key to your poll data, and losing it 
              means losing all your valuable insights. Remember to keep
              your password safe and secure, and only share it with trusted 
              individuals. Keep in mind that your data is encrypted using 
              your password, so take care to protect it at all times.
            </p>
            
          </div>

          <div className='results-wrapper'>
            { renderControls() }
          </div>

          <div className='button-wrapper'>
            <button type='button' onClick={addPollItem} className='button button__highlight'><Icon.Plus /> Add another option</button>
            <button type='button' onClick={addPollItem} className='button'><Icon.Minus /> Remove last option</button>
          </div>

          <div className='option-wrapper'>
            <h2 className='accent'>Expiry Date:</h2>
            <input type="date" id="expiry" name="expiry" onChange={(e) => setPollExpiry(e.target.value)}/>
          </div>
          <ReCAPTCHA theme='dark' size='normal' type='image' badge='bottomright' sitekey="6LfuZXIkAAAAAC0Paqoh0PFh4EvSLKgK8jrj8pCN" ref={captchaRef}  />
          <button type='button' className='button button__highlight' onClick={handleSubmit}>Submit</button>
          <p>*By clicking submit you recognize that the information above will be encrypted (client-side)
            and retreiving said information will not be possible without the encryption key you have created.
          </p>
        </form>

        { renderSuccess() }

    </div>
  )
}

export default Create