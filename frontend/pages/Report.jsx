
import Header from '../components/Header'
import React, { useState, useEffect, useContext } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { backend_URL } from '../src/App';
import { LoginContext } from '../src/main';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';

function Report() {
    const navigate = useNavigate()
    const [classes, setClasses] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [students, setStudents] = useState([]);
    const [showTable, setShowTable] = useState(false)
    const [details, setDetails] = useState([]);
    const [selectedDetails, setSelectedDetails] = useState({});
    const [marks, setMarks] = useState({});
    const [grades, setGrades] = useState({});
    const [remarks, setRemarks] = useState({});
    const [response, setResponse] = useState(null);

    const [titles, setTitles] = useState([])
    const { user } = useContext(LoginContext);
    const [assessmentName, subjectName] = selectedAssessment?.split(' - ')

    const downloadHandler = () => {
    navigate(`/report/dummy`)
}

    const ShowButton = async () => {
        try {
            console.log(selectedClass);
            const response = await axios.get(`${backend_URL}/teachers/getstudents`, {
                params: {
                    Class: selectedClass,
                },
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            setStudents(response.data.students);
            setShowTable(true);

        } catch (error) {
            console.log(error)
            toast.error('Internal server Error');
        }
    }

    useEffect(() => {

        const fetchClasses = async () => {

            try {
                const response = await axios.post(`${backend_URL}/teachers/class`, {
                    teacher: user.name
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }

                )
                if (!response.data.message) {
                    return toast.error("Cant select Classes")
                }
                setClasses(response.data.names);

            } catch (error) {
                console.log(error);
                navigate('/login');
                toast.error('internal server error!')
            }
        }
        fetchClasses();
    }, [user])

    useEffect(() => {
        const fetchSubject = async () => {

            try {
                const { data } = await axios.post(`${backend_URL}/teachers/getassessment`, {
                    Class: selectedClass,
                    teacher: user.name,

                }, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,

                })

                setAssessments(data.assTitles);
                setDetails(data.assessments);
            } catch (error) {
                console.log(error)
                toast.error('internal server error');
            }
        }
        fetchSubject();
    }, [selectedClass])

    useEffect(() => {
        if (selectedAssessment && details.length > 0) {
            const selectedDetail = details.find(element => element.title === assessmentName && element.subjects === subjectName);
            setSelectedDetails(selectedDetail || {});
            setTitles(selectedDetail?.rubrics);
        }
    }, [selectedAssessment, details])


    return (
        <>
            <Header />
            <div className='d-flex align-items-center justify-content-center w-100 px-5 py-3 h-100'>
                <div className='py-4 w-100 h-100 px-4'>
                    <div className='evaluate fs-4 fw-semibold'>
                        Report
                    </div>
                    <hr />

                    <div className='w-75 d-flex align-items-center justify-content-center my-3 px-3 gap-3' >
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Class</InputLabel>
                            <Select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                label="Class"
                            >
                                {Array.isArray(classes) && classes.length > 0 ? (
                                    classes.map((cls) => (
                                        <MenuItem key={cls} value={cls}>
                                            {cls}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No classes available</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Assessment</InputLabel>
                            <Select
                                value={selectedAssessment}
                                onChange={(e) => setSelectedAssessment(e.target.value)}
                                label="Assessment"
                            >
                                {Array.isArray(assessments) && assessments.length > 0 ? (

                                    assessments.map((ass, index) => (
                                        <MenuItem key={index} value={`${ass.title} - ${ass.subjects}`}>
                                            {`${ass.title} - ${ass.subjects}`}
                                        </MenuItem>
                                    ))

                                ) : (
                                    <MenuItem disabled> No Assessments Found</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={ShowButton}>
                            Show
                        </Button>
                    </div>
                    <hr />
                    <div className="headings px-2 py-3 d-flex gap-5 fs-6 fw-medium align-items-center justify-content-between">

                        <h1>Assessment Title: {assessmentName}</h1>
                        <h1>Subject: {subjectName}</h1>
                        <div className='d-flex gap-2'>

                            <Button variant='contained' onClick={downloadHandler} sx={{
                                backgroundColor: '#FFD700',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#FFD700', // Darker yellow on hover
                                },
                            }}>Download Report</Button>
                        </div>
                    </div>
                    <hr />
                    <div className='px-2 '>
                        {showTable && <>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><input type="checkbox" name="" id="" />{"     "}Select All</TableCell>
                                            <TableCell><strong>Roll No.</strong></TableCell>
                                            <TableCell><strong>Name</strong></TableCell>
                                            <TableCell><strong>Class</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {students.map((student, index) => (
                                            <TableRow key={index}>
                                                <TableCell><input type="checkbox" name="" id="" /></TableCell>
                                                <TableCell>{student.rollNum}</TableCell>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>{student.Class}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {response && <div>{response.message}</div>}
                            </TableContainer>

                        </>}

                    </div>





                </div>
            </div>
        </>
    )
}
export default Report
