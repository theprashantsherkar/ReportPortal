import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, {useState, useContext} from 'react'
import toast from 'react-hot-toast';
import { backend_URL } from '../src/App';
import { IoEyeOutline } from "react-icons/io5";
import '../styles/register.css'
import LoginContext from '../context/LoginContext';


function Register() {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const { isLoggedIn, setIsLoggedIn, setUser } = useContext(LoginContext);
    const onTap = () => {
        setToggle(!toggle);
    }
    const eye = <IoEyeOutline />;
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            // const { result } = await axios.get(`${backend_URL}/admin/profile`, {
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // })
            // setUser(result.User.name);
            const { data } = await axios.post(`${backend_URL}/admin/register`, {
                name,
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!data.success) {
                return toast.error(data.message)
            }
            toast.success(data.message);
            navigate('/dashboard', { state: { id: data.message } });
            setIsLoggedIn(true);
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
                        <input
                            className='pass'
                            type={(toggle==true)?"text":"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Password'
                        />
                        <IoEyeOutline className='eye' onClick={onTap}/>

                        <br />
                        <div className="btns">
                            <button type="submit">Sign In</button>
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