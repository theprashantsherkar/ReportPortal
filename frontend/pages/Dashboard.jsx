import React, { useState } from 'react'
import '../styles/dashboard.css'
import Header from '../components/Header.jsx'
import { backend_URL } from '../src/App.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';


function Dashboard() {
    //dashboard api goes here
    const [data, setData] = useState("");
    const [file, setFile] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!file) {
            return toast.error('upload file first')
        }

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`${backend_URL}/admin/upload`, formData, {
                headers: {
                    "Content-Type": "multipart-form-data"
                },
                withCredentials: true
            });
            setData(response.data.data);
            toast.success(response.data.message)

        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error, try after sometime!')
        }
    }
    return (
        <>
            <Header />
            <div className="dashboard">
                <div className="dash w-75">
                    <div className="students text-2xl border-black">
                        <select  className= "p-2 border-black" name="" id="">
                            <option className='p-2' value=""><h1 className='text-2xl' >Students</h1></option>
                            <option className='p-2' value=""><h1 className='text-2xl'>Teachers</h1></option>
                        </select>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="inputs border-2 bg-black-500 rounded p-3 flex justify-center w-100 ">
                            <input onChange={handleFileChange} className='border-1 border-black p-2' type="file"  name="file" id="excel"/>
                            <button type="submit">Upload</button>
                        </div>
                    </form>
                    <hr />
                    <div className="searches">
                        <p>show
                            <select name="" id="">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                            </select>
                            entries.
                        </p>
                        <div className="tab">
                            <label htmlFor="search">Search: </label>
                            <input className='search' type="search" name="" id="search" />
                        </div>
                    </div>



                    <div className='bg-orange-600 underline mt-5 w-full h-full'>
                        <h2>data fetched: </h2>
                        {/* <p>{data}</p> */}
                        {
                            (!data) ? (
                                <>
                                    <h2>no data</h2>
                                </>
                            ) : (
                                    <>
                                        <table className='table table-bordered'>

                                            <thead>

                                                <tr>
                                                    {data.length > 0 && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((row, index) => (
                                                    <tr key={index}>
                                                        {Object.values(row).map((value, i) => <td key={i}>{value}</td>)}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                           )
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard