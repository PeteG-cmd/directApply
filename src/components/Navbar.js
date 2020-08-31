
import React, { useState } from 'react'


const Navbar = () => {

  const [mobile, setMobile] = useState(false)

  const handleMobile = () => {
    setMobile(!mobile)
  }

  return (<>

    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

        <img className='logo' src="https://us.directlyapply.com/imagesl/directlyapply.png" />

        <a role="button" className={`navbar-burger burger ${mobile ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={handleMobile}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={`navbar-menu ${mobile ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <a className="navbar-item">
            HOME
          </a>

          <a className="navbar-item">
            JOB SEEKERS
          </a>

          <a className="navbar-item">
            HIRE
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              MORE
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item dark">
                About
              </a>
              <a className="navbar-item dark">
                Careers
              </a>
              <a className="navbar-item dark">
                Contact
              </a>
            </div>
          </div>
        </div>


        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <p>Already have an account?</p>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>


  </>
  )

}

export default Navbar