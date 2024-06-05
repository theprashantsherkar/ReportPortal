import React, { useState } from 'react'

function Header() {

    const [user, setUser] = useState('')
  return (
      <>
          <div className="container">
              <div className="content">
                  <div className="heading">
                      <h1>
                          Report Card System.
                      </h1>
                      <h3>
                          {user | 'vivek kumar'}
                      </h3>
                  </div>
              </div>
      </div>
      </>
  )
}

export default Header