import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react'
import toast from 'react-hot-toast';
import { backend_URL } from '../src/App';
import { IoEyeOutline } from "react-icons/io5";
import '../styles/register.css'
import { LoginContext } from '../src/main';



function Register() {
    const { isLoggedIn, setIsLoggedIn, loading, setLoading } = useContext(LoginContext)
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const onTap = () => {
        setToggle(!toggle);
    }

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${backend_URL}/admin/register`, {
                name,
                email,
                role,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (!data.success) {
                toast.error(data.message)
                return setLoading(false)
            }
            toast.success(data.message);
            navigate('/dashboard', { state: { id: data.message } });
            setIsLoggedIn(true);
            setLoading(false);
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }


    }
    return (
        <>
            <div className="login">
                <div className="empty">
                    <img src="../src/logo.png" alt="school logo" />
                </div>
                <div className='content'>
                    <form className='form' onSubmit={submitHandler}>

                        <h1>SIGN IN</h1>
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='name' />
                        <br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email' />
                        <br />
                        <div className='py-1 px-2 border border-black border-t-0'>
                            <label htmlFor="role">Select Role: </label>
                            <select onChange={(e)=> setRole(e.target.value)} name="role" id="role" >
                                <option value=""  >Select Role</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <br />
                        <input
                            className='pass'
                            type={(toggle == true) ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                        <IoEyeOutline className='eye' onClick={onTap} />

                        <br />
                        <div className="btns">
                            <button disabled={loading} type="submit">Sign In</button>
                        </div>
                        <h4>
                            Or
                        </h4>
                        <div className="link">
                            <Link className='signup' to={"/login"}>Log in</Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Register