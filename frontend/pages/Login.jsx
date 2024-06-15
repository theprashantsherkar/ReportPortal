import React, { useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import '../styles/login.css'
import toast from 'react-hot-toast';
import { backend_URL } from '../src/App';

function Login() {
    const [toggle, setToggle] = useState(false);
    const onTap = () => {
        setToggle(!toggle);
    }
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
                <div className="empty">
                    <img src="../src/logo.png" alt="" />
                </div>
                <div className='content'>
                    <form onSubmit={submitHandler}>

                        <h1>LOGIN</h1>
                        <input
                            className='loginEmail'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email' />
                        <br />
                        <input
                            className='loginPass'
                            type={(toggle == true)?"text":"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password' />
                        <br />
                        <IoEyeOutline className='loginEye' onClick={onTap}/>
                        <div className="btns">
                            <button type="submit">Log in</button>
                        </div>
                        <h4>
                            Or
                        </h4>
                        <div className="link">
                            <Link className='signup' to={"/register"}>Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login