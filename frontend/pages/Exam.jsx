import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,

} from '@mui/material';
import axios from 'axios';
import { backend_URL } from '../src/App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DeleteBtn from '../components/Buttons/DeleteBtn';
import EditBtn from '../components/Buttons/EditBtn';
import { LoginContext } from '../src/main';
import UpdateDialogs from '../components/Dialogs/UpdateDialogs';
import Header from '../components/Header';

function Exam() {
  const [Class, setClass] = useState('');
  const [session, setSession] = useState('');
  const [section, setSection] = useState('');
  const [teacher, setTeacher] = useState('');
  const [names, setNames] = useState([]);
  const [examData, setExamData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { subjects, setSubjects } = useContext(LoginContext);
  const navigate = useNavigate();

  const classSubmit = (e) => setClass(e.target.value);
  const sessionSubmit = (e) => setSession(e.target.value);
  const sectionSubmit = (e) => setSection(e.target.value);
  const teacherSubmit = (e) => setTeacher(e.target.value);

  const handleAssessments = async (id) => {
    try {
      const { data } = await axios.get(`${backend_URL}/assessments/sendsubjects/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setSubjects(data.subjects);
      navigate(`/assessment/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Class || !session || !section || !teacher) {
      return toast.error('Please enter all input fields.');
    }
    try {
      const response = await axios.post(`${backend_URL}/exam/createExam`, {
        Class, session, section, teacher,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (!response.data.success) {
        return toast.error(response.data.message);
      }
      toast.success(response.data.message);
      setExamData([...examData, response.data.exam]);
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
  };

  const DeleteHandler = async (id) => {
    try {
      const response = await axios.delete(`${backend_URL}/exam/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (!response.data.success) {
        return toast.error("Something went wrong");
      }
      toast.success(response.data.message);
      setExamData(examData.filter((exam) => exam._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await axios.get(`${backend_URL}/exam/allExams`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setExamData(data.exam);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${backend_URL}/admin/getallusers`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setNames(data.names);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

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

  }, [handleSubmit, DeleteHandler, dialogOpen, examData])

  if (examData?.length > 1) {
    var headers = Object.keys(examData[0]).filter(header => header !== "madeBy" && header !== "_id" && header !== "__v");
  }

  return (
    <>
      <Header />
      <div className='w-100 h-100 p-5'>
        <h1 className='head align-center fs-4'>Exam:</h1>
        <hr />
        <div className="options w-100 px-2 m-4 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className='options d-flex align-items-center justify-content-center'>
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
                {names?.map((element) => (
                  <option value={element}>{element}</option>
                ))}


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
            <input className='border border-black rounded px-2 mx-2' type="search" name="" id="search" />
          </div>
        </div>
<hr />
        <div>
          {examData?.length ? (
            <>
              <h2 className=" fs-5 font-bold my-4 ">Submitted Data:</h2>
              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow >
                      {headers.map((header, index) => (
                        <TableCell key={index} sx={{ border: '1px solid black' }}><strong>{header.charAt(0).toUpperCase() + header.slice(1)}</strong></TableCell>
                      ))}
                      <TableCell sx={{ border: '1px solid black' }}><strong>Config</strong></TableCell>
                      <TableCell sx={{ border: '1px solid black' }}><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {examData.map((item, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {headers.map((header, colIndex) => (
                          <TableCell key={colIndex} sx={{ border: '1px solid black' }}>{item[header]}</TableCell>
                        ))}
                        <TableCell sx={{ border: '1px solid black' }}>
                          <button className='btn btn-primary' onClick={() => handleAssessments(item._id)}>Assessments</button>
                        </TableCell>
                        <TableCell className='mx-1 ' sx={{ border: '1px solid black' }}>
                          <button className='btn btn-warning px-2' onClick={() => setDialogOpen(true)}><EditBtn /></button>{ "   "}
                          <button className='btn btn-danger px-2' onClick={() => DeleteHandler(item._id)}><DeleteBtn /></button>
                          {dialogOpen && (
                            <UpdateDialogs
                              open={dialogOpen}
                              onClose={() => setDialogOpen(false)}
                              id={item._id}
                             
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <h2 className='my-2 fs-6'>No data available.</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default Exam;
