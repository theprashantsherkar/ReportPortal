import React, { useState } from 'react'
import '../styles/dashboard.css'
import Header from '../components/Header.jsx'
import { backend_URL } from '../src/App.jsx';
import toast from 'react-hot-toast';
import { AxiosHeaders } from 'axios';

function Dashboard() {
    //dashboard api goes here
    const [data, setData] = useState("");
    const [file, setFile] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.value[0]);
    }

    const handleUpload = async () => {
        if (!file) {
            return toast.error('upload file first')
        }

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    "Content-Type": "multipart-form-data"
                },
                withCredentials: true
            });

            if (response.data.data) {
                setData(response.data.data)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Internal Server Error, try after sometime!')
        }
    }
    return (
        <>
            <Header />
            <div className="dashboard">
                <div className="dash">
                    <div className="students">
                        <h1>Students</h1>
                    </div>
                    <div className="inputs">
                        <input type="file" name="excel" id="excel" />
                        <button type="submit">Upload</button>
                    </div>
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
                    <table className='table table-bordered' id='table1'>
                        {/* use the map function here to generate table */}
                        <tr>
                            <th>Student name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>avid</td>
                            <td>avid@gmail.com</td>
                            <td><button type='buton' className='buttons'>View</button></td>
                        </tr>

                    </table>

                </div>
            </div>

        </>
    )
}

export default Dashboard