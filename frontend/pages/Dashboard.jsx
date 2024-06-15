import React from 'react'
import '../styles/dashboard.css'
import Header from '../components/Header.jsx'

function Dashboard() {
    //dashboard api goes here
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
                            <input type="search" name="" id="search" />
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