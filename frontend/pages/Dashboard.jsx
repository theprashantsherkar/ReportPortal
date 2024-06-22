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
        setFile(e.target.value[0]);
        console.log('check1')

    }

    const handleUpload = async () => {
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
            console.log('check2')
            if (response.data.data) {
                setData(response.data.data)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message);
            }
            console.log('check3')

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
                    <div className="students">
                        <h1>Students</h1>
                    </div>
                    <form method='POST' encType='multipart-form-data'>
                        <div className="inputs border-2 bg-black-500 rounded p-3 flex justify-center w-100 ">
                            <input className='border-1 border-black p-2' type="file"  name="file" id="excel"/>
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
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard