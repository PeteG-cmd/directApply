import React, { useState } from 'react'


const Signup = () => {

  // Asign the inital state for the users details and any potential errors, using react hooks.
  const [details, setDetails] = useState({ customerName: '', emailAddress: '', password: '', passwordConfirmation: '', referalMethod: 'Please Select', sendJobMatches: false, serviceTermsAgreed: false })

  const [errors, setErrors] = useState({ customerName: '', emailAddress: '', password: '', passwordConfirmation: '', serviceTermsAgreed: '' }) // All errors initially set as empty strings


  // This is the regex needed to confirm a valid email address. NOTE - I actually found this on the stackOverflow, and although I have used a regex to check email formatting before I would struggle to create this from scratch!
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  // Handle changes to the text fields. On change, spread the details object and update the state of the selected attribute

  const handleChange = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value })
    // Once the user has started typing in a field, we then also check that field live for errors and display the message to the user
    setErrors({ ...errors, [event.target.name]: getErrorDetails(event.target.name, event.target.value) })
  }


  // Handle changes the possible check boxes. State is initally set to false, and can be toggled by the user for each attribute

  const handleCheckBox = (event) => {
    setDetails({ ...details, [event.target.name]: !details[event.target.name] })
  }


  // Handle submit of the form.
  const handleSubmit = (event) => {
    event.preventDefault() // Prevent the page refreshing
    checkSubmitErrors() // Since the live error checking does not occur until a user starts entering information in a box, we force the state to be checked against the errors on submit as a 'catch all'
    if (confirmFormValid()) { // Check the form for errors
      console.log(details) // Log the validated details to the console (instead of sending a POST request to the server)
    } else {
      console.log('There are errors with the user input') // Else, confirm errors are present
    }
  }



  // Below are the functions to validate the data. I wanted to keep these separate in case they are changed over time, so we will only have to update them in one place.

  function testCustomerName(data) {
    return data.length > 0
  }

  function testEmail(data) {
    return regex.test(data)
  }

  function testPassword(data) {
    return data.length > 5
  }

  function testPasswordConfirmation(data) {
    return data === details.password
  }

  function testTermsAgreed() {
    return details.serviceTermsAgreed
  }

  function testReferalPresent() {
    return details.referalMethod !== 'Please Select'
  }


  // Function to check complete form is valid before POSTing to server (or console logging in this case)

  function confirmFormValid() {
    return testCustomerName(details.customerName) && testEmail(details.emailAddress) && testPassword(details.password) && testPasswordConfirmation(details.passwordConfirmation) && testTermsAgreed() && testReferalPresent()
  }


  // Function to force error check across all fields. Required as 'live' error checking does not occur until a field is selected. I chose to do this so the user does not see errors in every field before they have even started typing in a field.

  function checkSubmitErrors() {
    const tempErrors = {} // Create a temporary object so i can update the state in one call
    Object.entries(details).map(detail => { // Get the object key/value pairs in an array so I can iterate through them - useful in case further fields are added later
      tempErrors[detail[0]] = getErrorDetails(detail[0], detail[1])
    })
    setErrors(tempErrors) // Set the errors to state so page re-renders
  }


  // Function to return the details of an error for each field. Also handles some styling and highlighting neccessary field red if errors occur

  function getErrorDetails(detail, value) {

    if (detail === 'customerName') {
      if (testCustomerName(value)) { // perform validation test
        removeErrorState(detail) // set needed styling on error fields so user can easily see where any problems are
        return '' // return an empty string if test is passed
      } else {
        addErrorState(detail)
        return 'You must enter a name' // Return error detail for user display if needed
      }
    }

    // Below is as above. This feels repetetive and against DRY principles, but due the need to display differant messages I have left it for the moment. I would like to improve this if I had more time.

    if (detail === 'emailAddress') {
      if (testEmail(value)) {
        removeErrorState(detail)
        return ''
      } else {
        addErrorState(detail)
        return 'You must enter a valid email address'
      }
    }

    if (detail === 'password') {
      if (testPassword(value)) {
        removeErrorState(detail)
        return ''
      } else {
        addErrorState(detail)
        return 'Your password must be at least 6 characters long'
      }
    }

    if (detail === 'passwordConfirmation') {
      if (testPasswordConfirmation(value)) {
        removeErrorState(detail)
        return ''
      } else {
        addErrorState(detail)
        return 'The passwords must match'
      }
    }

    if (detail === 'referalMethod') {
      if (testTermsAgreed()) {
        removeErrorState(detail)
        return ''
      } else {
        addErrorState(detail)
        return 'Please tell us how you heard about us'
      }
    }

    if (detail === 'serviceTermsAgreed') {
      if (testTermsAgreed()) {
        removeErrorState(detail)
        return ''
      } else {
        addErrorState(detail)
        return 'You must agree to our terms and conditions'
      }
    }
  }

  // Simple controll to get elements and add classes as the user is typing. This could be done in the classes, but i think it keeps the code cleaner to separate it out.

  function addErrorState(detail) {
    document.getElementById(detail).classList.remove('error-pass')
    document.getElementById(detail).classList.add('error-fail')
  }

  function removeErrorState(detail) {
    document.getElementById(detail).classList.remove('error-fail')
    document.getElementById(detail).classList.add('error-pass')
  }


  // The input form returned as HTML
  return (<>

    <h1 className="mainTitle title">We have some amazing tools
    to help you with your job search</h1>

    <p className="titleTwo subtitle">Get completely free access to <a href="#">curated job matches</a> , <a href="">resume builder</a> and our <a href="">job application tracker</a></p>

    <div className="box signUpForm">

      <form onSubmit={handleSubmit}>
        <div className="section">
          <div className="field">


            <label className="label">
              Your Name:
            </label>
            <input type="text" name='customerName' id='customerName' value={details.customerName} onChange={handleChange} />
          </div>
          {errors.customerName && <small className='error'>{errors.customerName}</small>}


          <div className="field">
            <label className="label">
              Email:
            </label>
            <input type="text" name='emailAddress' id='emailAddress' value={details.email} onChange={handleChange} />
          </div>
          {errors.emailAddress && <small className='error'>{errors.emailAddress}</small>}


          <div className="field">
            <label className="label">
              Password:
            </label>
            <input type="password" name='password' id='password' value={details.password} onChange={handleChange} />
          </div>
          {errors.password && <small className='error'>{errors.password}</small>}


          <div className="field">
            <label className="label">
              Confirm Password:
            </label>
            <input type="password" name='passwordConfirmation' id='passwordConfirmation' value={details.passwordConfirmation} onChange={handleChange} />
          </div>
          {errors.passwordConfirmation && <small className='error'>{errors.passwordConfirmation}</small>}

          <div className="box">
            <div className="field">
              <label className="label">
                How did you hear about us?
              </label>
              <select name="referalMethod" id='referalMethod' onChange={handleChange} value={details.referalMethod}>
                <option>Please Select</option>
                <option>Google</option>
                <option>Job Board</option>
                <option>Social Media</option>
                <option>Other</option>
              </select>
            </div>
            {errors.referalMethod && <small className='error'>{errors.referalMethod}</small>}
          </div>


          <div className="box">
            <div className="field">
              <label>
                Send me curated job matches:
                <input type='checkbox' name='sendJobMatches' checked={details.sendJobMatches} onChange={handleCheckBox}></input>
              </label>
            </div>
          </div>


          <div className="box">
            <div className="field">
              <label>
                I agree to the <a href='#'><small>&apos;Terms of Service&apos;</small></a> and <a href='#'><small>&apos;Privacy policy&apos;</small></a>
                <input type='checkbox' name='serviceTermsAgreed' id='serviceTermsAgreed' checked={details.serviceTermsAgreed} onChange={handleCheckBox}></input>
              </label>
            </div>
            {errors.serviceTermsAgreed && <small className='error'>{errors.serviceTermsAgreed}</small>}
          </div>

          <button className='button is-success is-fullwidth submit'>Sign up!</button>
        </div>
      </form>

      <p>Already have an account?</p>
      <a href='#'><button className="button is-fullwidth is-info">Log In</button></a>
    </div>
  </>

  )
}

export default Signup