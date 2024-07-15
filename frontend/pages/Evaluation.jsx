import React, { useState, useEffect } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Header from '../components/Header'
import axios from 'axios';

function Evaluation() {
    const [classes, setClasses] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});

    useEffect(() => {
        axios.get('/api/classes').then((res) => setClasses(res.data));
        axios.get('/api/assessments').then((res) => setAssessments(res.data));
    }, []);

    useEffect(() => {

        if (selectedAssessment) {
            axios.get(`/api/subjects?assessment=${selectedAssessment}`).then((res) => setSubjects(res.data));
        }
    }, [selectedAssessment]);

    const handleShowStudents = () => {

        axios.get(`/api/students?class=${selectedClass}`).then((res) => setStudents(res.data));
    };

    const handleMarksChange = (studentId, subject, value) => {
        setMarks({
            ...marks,
            [studentId]: {
                ...marks[studentId],
                [subject]: value,
            },
        });
    };

    const handleSaveMarks = () => {

        axios.post('/api/marks', { marks }).then((res) => {
            console.log('Marks saved successfully', res.data);
        });
    };
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
                                value={classes}
                                onChange={(e) => setClasses(e.target.value)}
                                label="Class"
                            >
                                <MenuItem value="Class 1">Class 1</MenuItem>
                                <MenuItem value="Class 2">Class 2</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Assessment</InputLabel>
                            <Select
                                value={assessments}
                                onChange={(e)=>setAssessments(e.target.value)}
                                label="Assessment"
                            >
                                <MenuItem value="Assessment 1">Assessment 1</MenuItem>
                                <MenuItem value="Assessment 2">Assessment 2</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Subjects</InputLabel>
                            <Select
                                value={subjects}
                                onChange={(e) => setSubjects(e.target.value)}
                                label="Subjects"
                            >
                                <MenuItem value="Subject 1">Subject 1</MenuItem>
                                <MenuItem value="Subject 2">Subject 2</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={handleShowStudents}>
                            Show
                        </Button>
                    </div>






                </div>
            </div>
        </>
    )
}

export default Evaluation