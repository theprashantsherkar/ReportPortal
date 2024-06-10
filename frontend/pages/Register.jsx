import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

function Register() {

    const submitHandler = (e) => {
        e.preventdefault();
        try {
            const { data } = axios.get(`${backend_URL}/users/register`).then().catch()
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!");
        }
    }
    return (
        <>
            <div className="login">
                <section>
                    <form onSubmit={submitHandler}>


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
                            <Link className='signup' to={'/register'}>Sign Up</Link>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default Register