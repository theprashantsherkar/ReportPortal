import axios from 'axios';
import React, {useState} from 'react'
import toast from 'react-hot-toast';
import { backend_URL } from '../src/App';
import { IoEyeOutline } from "react-icons/io5";
import '../styles/register.css'

function Register() {
    const [toggle, setToggle] = useState(false);
    const onTap = () => {
        setToggle(!toggle);
    }
    const eye = <IoEyeOutline />;
    const [name, setName] = useState("")
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
                            {/* <Link className='signup' to={""}>Log in</Link> */}
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Register