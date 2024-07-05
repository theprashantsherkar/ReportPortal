import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import '../styles/exam.css'
import axios from 'axios'
import { backend_URL } from '../src/App'
import toast from 'react-hot-toast'
import { useRef } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Dialogbox from '../components/Dialogs/Dialogbox'
import DeleteBtn from '../components/Buttons/DeleteBtn'
import EditBtn from '../components/Buttons/EditBtn'
import UpdateDialogs from '../components/Dialogs/UpdateDialogs'


function Exam() {
  const [Class, setClass] = useState('')
  const [session, setSession] = useState('')
  const [section, setSection] = useState('')
  const [teacher, setTeacher] = useState('')
  const [examData, setExamData] = useState([]);
  const [activeRow, setActiveRow] = useState(null)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const classSubmit = (e) => {
    setClass(e.target.value)

  }
  const sessionSubmit = (e) => {
    setSession(e.target.value)
  }
  const sectionSubmit = (e) => {
    setSection(e.target.value)
  }
  const teacherSubmit = (e) => {
    setTeacher(e.target.value)
  }


  const handleAssessments = (id) => {
    console.log(`exam with id:${id} was clicked`)
    navigate(`/assessment/${id}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Class || !session || !section || !teacher) {
      return toast.error('Please enter all input fields.');
    }
    try {
      const response = await axios.post(`${backend_URL}/exam/createExam`, {
        Class,
        session,
        section,
        teacher
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true

      })
      if (!response.data.success) {
        return toast.error(response.data.message);
      }
      toast.success(response.data.message)
    } catch (error) {
      toast.error('Something went wrong!')
      console.log(error)
    }

  }



  const DeleteHandler = async (id) => {
    // e.preventDefault();
    const response = await axios.delete(`${backend_URL}/exam/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    if (!response.data.success) {
      return toast.error("something went wrong")
    }
    toast.success(response.data.message)

  }


  useEffect(() => {
    axios.get(`${backend_URL}/exam/allExams`, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
    }).then((res) => {
      setExamData(res.data.exam)
      // console.log(examData);
    }).catch((err) => console.log(err));

  }, [handleSubmit, DeleteHandler])




  if (examData && examData.length > 1) {
    var headers = Object.keys(examData[0]).filter((header) => header !== "madeBy" && header !== "_id" && header !== "__v");
  }
  return (
    //exam dashboard ui goes here
    <>
      <Header />
      <div className='w-100 h-100 p-5'>
        <h1 className='head align-center'>
          Exam:
        </h1>
        <hr />

        <div className="options w-100 px-2 m-4">
          <form onSubmit={handleSubmit} className='options'>
            <div className='mx-2 max-w-fit'>
              <label htmlFor="dropdown" className=" mx-2 text-sm font-medium text-gray-700">Select Class</label>
              <select
                id="dropdown" onChange={classSubmit}
                className="mt-1 py-2 text-base border border-black  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >

                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>
            <div className='mx-2 max-w-fit'>
              <label htmlFor="admins" className=" mx-2 text-sm font-medium text-gray-700">Select Class Teacher</label>
              <select
                id="admins" onChange={teacherSubmit}
                className="mt-1 pl-3 pr-10 py-2 text-base border border-black  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="Vivek Kumar">Vivek Kumar</option>
                <option value="Monu">Monu</option>
                <option value="Prashant">Prashant</option>


              </select>
            </div>
            <div className='mx-2 max-w-fit'>
              <label htmlFor="sections" className=" mx-2 text-sm font-medium text-gray-700">Select Section</label>
              <select
                id="sections" onChange={sectionSubmit}
                className="mt-1 pl-3 pr-10 py-2 text-base border border-black  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>


              </select>
            </div>
            <div className='mx-2 max-w-fit'>
              <label htmlFor="sessions" className=" mx-2 text-sm font-medium text-gray-700">Select Class Session</label>
              <select
                id="sessions" onChange={sessionSubmit}
                className="mt-1 pl-3 pr-10 py-2 text-base border border-black  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              ><option value="" disabled>Session</option>
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
              </select>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
        <hr />

        <div className="searches">
          <p>show <select name="" id="">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select> entries</p>
          <div className="tab">
            <label htmlFor="search">Search: </label>
            <input className='search' type="search" name="" id="search" />
          </div>
        </div>

        <div>
          {(examData) ? (<>
            <h2 className="text-xl font-bold mb-4">Submitted Data:</h2>
            <div className="mt-10 d-flex align-items-center justify-content-center">
              <table className="min-w-full border-collapse  border border-gray-300 ">
                <thead>
                  <tr>

                    {examData.length > 1 && headers.map((header, index) => (
                      <>
                        <th key={index} className="border border-gray-300 px-4 py-2">{header.charAt(0).toUpperCase() + header.slice(1)}</th>
                      </>
                    ))}
                    {examData.length > 1 && (<>
                      <th className='border border-gray-300 px-4 py-2'>Config</th>
                      <th className='border border-gray-300 px-4 py-2'>Action</th></>)}
                  </tr>
                </thead>
                <tbody>
                  {examData.length > 1 && examData.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {examData.length > 1 && headers.map((header, colIndex) => (
                        <>
                          <td key={colIndex} className="border border-gray-300 px-3 py-2">{item[header].toString()}</td>
                        </>
                      )
                      )}
                      {examData.length > 0 && (<>
                        <td className='border border-gray-300 '><button  onClick={() => handleAssessments(item._id)} className='btn btn-primary mx-2' >Assessments</button></td>
                        <td className='border border-gray-300 px-1'><button className='btn btn-warning mx-1' onClick={() => setDialogOpen(true)}><EditBtn /></button>{dialogOpen && <><UpdateDialogs
                          open={dialogOpen}
                          onClose={() => setDialogOpen(false)}
                          id={item._id}
                        /></>}
                          <button onClick={() => DeleteHandler(item._id)} className='btn btn-danger m-1'><DeleteBtn /></button></td>
                      </>)
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </>
          ) : (<>
            no data found</>)}
        </div>
      </div>

    </>
  )
}

export default Exam