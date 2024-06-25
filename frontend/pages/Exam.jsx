import React, { useState } from 'react'
import Header from '../components/Header'
import '../styles/exam.css'

function Exam() {
  const [Class, setClass] = useState('')
  const [session, setSession] = useState('')
  const [section, setSection] = useState('')
  const [teacher, setTeacher] = useState('')
  const [examData, setExamData] = useState([])

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


  const handleSubmit = (e) => {
    e.preventDefault();
    
const date = new Date()
    const createdOn = `${date.getDate()}-${date.getMonth().toString()}-${date.getFullYear()}`
    const newData = [Class, session, section, teacher, createdOn];
    setExamData(examData.push(newData));
    console.log(examData);

  }
  //exam api goes here
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
                id="admins"  onChange={teacherSubmit}
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
          {examData && examData.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  {examData.map((item, index) => (
                    <th key={index} className="border border-gray-300 px-4 py-2">{`Field ${index + 1}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {examData.map((item, index) => (
                    <td key={index} className="border border-gray-300 px-4 py-2">{item.toString()}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

    </>
  )
}

export default Exam