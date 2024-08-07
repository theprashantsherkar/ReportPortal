import Header from '../components/Header'
import React, { useState, useEffect, useContext } from 'react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { backend_URL } from '../src/App';
import { LoginContext } from '../src/main';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Report() {
    const [selectAll, setSelectAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState([]);
    const [toDownload, setToDownload] = useState(false)
    const navigate = useNavigate();
    const [studentResult, setStudentResult] = useState([]);
    const [navigateReady, setNavigateReady] = useState(false);

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [students, setStudents] = useState([]);
    const [showTable, setShowTable] = useState(false);
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
                });

                if (!response.data.message) {
                    return toast.error("Can't select Classes");
                }
                setClasses(response.data.names);

            } catch (error) {
                console.log(error);
                navigate('/login');
                toast.error('Internal server error!');
            }
        };
        fetchClasses();
    }, [user]);


    const handleSelectAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        setCheckboxes(students.map(() => isChecked));
    };

    const handleCheckboxChange = (index) => (event) => {
        const isChecked = event.target.checked;
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = isChecked;
        setCheckboxes(newCheckboxes);

        setSelectAll(newCheckboxes.every(checkbox => checkbox));
    };

    const getSelectedStudentIds = () => {
        if (students.length === 0 || checkboxes.length === 0) {
            console.log("No students or checkboxes available");
            return [];
        }

        const selectedIds = students
            .map((student, index) => ({ _id: student._id, isChecked: checkboxes[index] }))
            .filter(student => student.isChecked)
            .map(student => student._id);

        return selectedIds;
    };

    const downloadHandler = async () => {
        try {
            const id = getSelectedStudentIds();
            console.log(id);
            if (id.length == 0) {
                return toast.error("Select Student First.")
            }
            const { data } = await axios.post(`${backend_URL}/result/report`, { id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            toast.success(data.message);
            console.log(data.results);
            setStudentResult(data.results);
            setNavigateReady(true);  // Set navigateReady to true after updating studentResult
        } catch (error) {
            console.error("Error fetching report:", error);
            toast.error("Failed to download report.");
        }
    };


    const ShowButton = async () => {
        try {
            const response = await axios.get(`${backend_URL}/teachers/getstudents`, {
                params: { Class: selectedClass },
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            setStudents(response.data.students);
            setCheckboxes(response.data.students.map(() => false));
            setShowTable(true);
            setToDownload(true);

        } catch (error) {
            console.log(error);
            toast.error('Internal server Error');
        }
    };

    useEffect(() => {
        if (navigateReady) {
            console.log(studentResult);
            navigate(`/report/dummy`, { state: { results: studentResult } });
            setNavigateReady(false);  // Reset navigateReady to false
        }
    }, [navigateReady, studentResult, navigate]);


    return (
        <>
            <Header />
            <div className='d-flex align-items-center justify-content-center w-100 px-5 py-3 h-100'>
                <div className='py-4 w-100 h-100 px-4'>
                    <div className='evaluate fs-4 fw-semibold'>Report</div>
                    <hr />

                    <div className='w-75 d-flex align-items-center justify-content-center my-3 px-3 gap-3'>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Class</InputLabel>
                            <Select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                label="Class"
                            >
                                {Array.isArray(classes) && classes.length > 0 ? (
                                    classes.map((cls) => (
                                        <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No classes available</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        
                        <Button variant="contained" onClick={ShowButton}>Show</Button>
                    </div>
                    <hr />
                    <div className="headings px-2 py-3 d-flex gap-5 fs-6 fw-medium align-items-center justify-content-between">
                        <div className='d-flex gap-2'>
                            {toDownload ? (<Button variant='contained' onClick={downloadHandler} sx={{
                                backgroundColor: '#FFD700',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#FFD700',
                                },
                            }}>Download Report</Button>) : (<Button variant='contained' disabled  sx={{
                                backgroundColor: '#FFD700',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#FFD700',
                                },
                            }}>Download Report</Button>)}
                        </div>
                    </div>
                    <hr />
                    <div className='px-2'>
                        {showTable && <>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <label className='fw-semibold' htmlFor="select">
                                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} name="" id="select" />Select All
                                                </label>
                                            </TableCell>
                                            <TableCell><strong>Roll No.</strong></TableCell>
                                            <TableCell><strong>Name</strong></TableCell>
                                            <TableCell><strong>Class</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {students.map((student, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <input type="checkbox" checked={checkboxes[index] || false} onChange={handleCheckboxChange(index)} name="" id="" />
                                                </TableCell>
                                                <TableCell>{student.rollNum}</TableCell>
                                                <TableCell>{student.name}</TableCell>
                                                <TableCell>{student.Class}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Report;
