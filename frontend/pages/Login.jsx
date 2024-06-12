import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/login.css'
import toast from 'react-hot-toast';
import { backend_URL } from '../src/App';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = (e) => {
        e.preventdefault();
        // try {
        //     const { data } = axios.get(`${backend_URL}/login`).then().catch()
        //     toast.success(data.message);

        // } catch (error) {
        //     console.log(error);
        // }


    }
    return (
        <>
            <div className="login">
                <div className="empty"></div>
                <div className='content'>
                    <form onSubmit={submitHandler}>

                        <h1>LOGIN</h1>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email' />
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password' />
                        <br />
                        <div className="btns">
                            <button type="submit">Log in</button>
                        </div>
                        <h4>
                            Or
                        </h4>
                        <div className="link">
                            {/* <Link className='signup' to={""}>Sign Up</Link> */}
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login