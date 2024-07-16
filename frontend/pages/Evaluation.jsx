import React, { useState, useEffect, useContext } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Header from '../components/Header'
import axios from 'axios';
import { backend_URL } from '../src/App';
import { LoginContext } from '../src/main';
import toast from 'react-hot-toast';

function Evaluation() {
    const [classes, setClasses] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const { user } = useContext(LoginContext);

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
                toast.error('internal server error!')
            }
        }
        fetchClasses();
    }, [user.name])

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


                console.log(data);
                setAssessments(data.assTitles);
            } catch (error) {
                console.log(error)
                toast.error('internal server error');
            }
        }
        fetchSubject();
    }, [selectedClass])


    return (
        <>
            <Header />
            <div className='d-flex align-items-center justify-content-center w-100 px-5 py-3 h-100'>
                <div className='py-4 w-100 h-100 px-4'>
                    <div className='evaluate fs-4'>
                        Evaluate
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

                                    assessments.map((ass, index) => {
                                        <MenuItem value={ass.title} key={index}>
                                            {ass.title}
                                        </MenuItem>
                                    })

                                ) : (
                                    <MenuItem disabled> No Assessments Found</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <Button variant="contained" >
                            Show
                        </Button>
                    </div>






                </div>
            </div>
        </>
    )
}

export default Evaluation