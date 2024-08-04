import React, { useEffect, useState } from 'react'
import '../styles/dashboard.css'
import Header from '../components/Header.jsx'
import { backend_URL } from '../src/App.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';


function Dashboard() {
    const [data, setData] = useState([]);
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
            if (!response.data.success) {
                return toast.error(response.data.message);
            }

            toast.success(response.data.message)

        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error, try after sometime!')
        }
    }

    useEffect(() => {
        const reloaded = sessionStorage.getItem('reloaded');
        if (!reloaded) {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload();
        }
        const getStudents = async () => {
            try {
                const response = await axios.get(`${backend_URL}/admin/fetchStudents`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,

                })
                if (!response.data.success) {
                    setData('');
                    return toast.error('Cant Fetch students right now')
                }
                setData(response.data.students)

                
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
            }


        }

        getStudents();

    }, [submitHandler])



    if (data && data.length > 1) {
        var headers = Object.keys(data[0]).filter((title) => title !== "_id" && title !== "__v")
    }



    return (
        <>
            <Header />
            <div className="dashboard">
                <div className="w-75 dash">
                    <div className="students text-2xl">
                        <select className="p-2 border-black border  rounded-md" name="" id="">
                            <option className='p-2' value="Students"><h1 className='text-2xl' >Students</h1></option>
                            <option className='p-2' value="Teachers"><h1 className='text-2xl'>Teachers</h1></option>
                        </select>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="inputs border border-black   rounded p-3 flex justify-center w-100 ">
                            <input onChange={handleFileChange} className='border-1 border-black rounded-md p-2 mx-2' type="file" name="file" id="excel" />
                            <button type='submit' className='btn btn-primary'>Upload</button>
                        </div>
                    </form>
                    <hr />
                    <div className="d-flex align-items-center justify-content-between py-3">
                        <p>show
                            <select name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                            entries.
                        </p>
                        <div className="">
                            <label htmlFor="search">Search: </label>
                            <input className='border border-black rounded-md px-2 ' type="search" name="" id="search" />
                        </div>
                    </div>



                    <div className=' underline mt-5 w-full h-full'>
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
                                                {data.length > 1 && headers.map((key) => <th key={key}>{key}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {headers.map((header, colIndex) => (
                                                        <>
                                                            <td key={colIndex} className="border border-gray-300 px-4 py-2">{item[header].toString()}</td>
                                                        </>
                                                    )
                                                    )}
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