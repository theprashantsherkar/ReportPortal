import React, { useState } from 'react'
import '../styles/header.css'

function Header() {

    const [user, setUser] = useState('')
    return (
        <>
            <div className="headingCont">
                <div className="content">
                    <div className="heading">
                        <h1>
                            Report Card System.
                        </h1>
                        <h4>
                             {user || 'vivek kumar'}
                        </h4>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Header