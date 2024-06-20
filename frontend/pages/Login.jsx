import React, { useState, useContext } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css'
import toast from 'react-hot-toast';
import { backend_URL } from '../src/App';
import axios from 'axios';
import { LoginContext } from '../src/main';


function Login() {
    const [toggle, setToggle] = useState(false);
    const { isLoggedIn, setIsLoggedIn, loading, setLoading } = useContext(LoginContext);
    const navigate = useNavigate()

    const onTap = () => {
        setToggle(!toggle);
    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${backend_URL}/admin/login`, {
                email,
                password,
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })

            if (!data.success) {
                toast.error(data.message)
                return setIsLoggedIn(false);
            }
            toast.success(data.message);
            setIsLoggedIn(true);
            setLoading(false);

            navigate('/dashboard', { state: { id: data.message } });

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
            setIsLoggedIn(false)
        }


    }
    return (
        <>
            <div className="login">
                <div className="empty">
                    <img src="../src/logo.png" alt="" />
                </div>
                <div className='content'>
                    <form className="form" onSubmit={submitHandler}>

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
                            type={(toggle == true) ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password' />
                        <br />
                        <IoEyeOutline className='loginEye' onClick={onTap} />
                        <div className="btns">
                            <button disabled={loading} type="submit">Log in</button>
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