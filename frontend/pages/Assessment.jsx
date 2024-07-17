import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import '../styles/assessments.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { backend_URL } from '../src/App'
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {
    ListItemText,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Chip
} from '@mui/material';
import toast from 'react-hot-toast'
import EditBtn from '../components/Buttons/EditBtn'
import DeleteBtn from '../components/Buttons/DeleteBtn'
import AssessmentDialog from '../components/Dialogs/AssessmentDialog'
import GradeSelect from '../components/Dialogs/GradeSelect'
import { LoginContext } from '../src/main'



function Assessment() {
    const exam = useParams();
    const [title, setTitle] = useState('');
    const [term, setTerm] = useState('');
    const [type, setType] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const [isRubrics, setIsRubrics] = useState('');
    const { subjects } = useContext(LoginContext);
    const [assessments, setAssessments] = useState([]);
    const [open, setOpen] = useState(false);
    const [openRubrics, setOpenRubrics] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState([]);


    const handleRubrics = (id) => {
        console.log(`button id:${id} clicked`);
        setOpenRubrics(!openRubrics);

    }

    const handleOpen = () => {
        setOpen(true);
    }

    const DeleteHandler = async (id) => {
        try {
            const response = await axios.delete(`${backend_URL}/assessments/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (!response.data.success) {
                return toast.error("internal server error.")
            }
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error('something went wrong, try after sometime')
        }
    }

    const handleSubmit = async () => {
        try {
            if (!title || !term || !type  || !selectedSubject) {
                console.log("Every field is mandatory!")
                return toast.error("Every field is mandatory!")
            }

            const response = await axios.post(`${backend_URL}/assessments/${exam.id}`, {
                title,
                term,
                type,
                maxMarks,
                isRubrics,
                subs: selectedSubject
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                })

            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
        //todo: term, type, rubrics to be droppped down! //done
        axios.get(`${backend_URL}/assessments/${exam.id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        }).then((response) => {
            setAssessments(response.data.assessments);
        })
    }, [handleSubmit, DeleteHandler, openRubrics, assessments])

    return (
        <>
            <Header />
            <div className='p-5'>
                <div className='Ass-Title font-extrabold'><h1>Assessment</h1></div>
                <hr />
                <div className=''>
                    <form action="" className='p-3'>
                        <div className='d-flex align-items-baseline justify-content-center flex-wrap '>
                            <div className='px-3 '>
                                {/* <TextField className='px-2' label="Title" value={title} onChange={(e) => setTitle(e.target.value)}  margin="normal" /> */}
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    name="title"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <FormControl margin="normal" fullWidth variant="standard">
                                    <InputLabel>Select Term</InputLabel>
                                    <Select
                                        name="term"
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                    >
                                        <MenuItem value="Term 1">Term 1</MenuItem>
                                        <MenuItem value="Term 2">Term 2</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" fullWidth variant="standard">
                                    <InputLabel>Select Subjects</InputLabel>
                                    <Select
                                        name="subjects"
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                    >
                                        {subjects.length > 0 ? (subjects.map((element, index) => (<MenuItem key={index} value={element}>{element}</MenuItem>))) : (<MenuItem disabled value="">No Subjects Added</MenuItem>)}

                                    </Select>
                                </FormControl>
                            </div>
                            <div className='px-3'>
                                <FormControl margin="normal" fullWidth variant="standard">
                                    <InputLabel>Select Evaluation Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <MenuItem value="Marks">Marks</MenuItem>
                                        <MenuItem value="Rubrics">Rubrics</MenuItem>
                                    </Select>
                                </FormControl>
                               
                                {type == "Marks" ? (<FormControl fullWidth disabled margin="normal" variant="standard">
                                    <InputLabel>Select Rubrics</InputLabel>
                                    <Select
                                        name="rubrics"
                                        value={isRubrics}
                                        onChange={(e) => setIsRubrics(e.target.value)}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>

                                    </Select>
                                </FormControl>) : (<FormControl fullWidth  margin="normal" variant="standard">
                                    <InputLabel>Select Rubrics</InputLabel>
                                    <Select
                                        name="rubrics"
                                        value={isRubrics}
                                        onChange={(e) => setIsRubrics(e.target.value)}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>

                                    </Select>
                                </FormControl>)}
                                {type == "Marks" ? (<TextField
                                    fullWidth
                                    margin="normal"
                                    name="maxMarks"
                                    label="Maximum Marks"
                                    type="number"
                                    variant="standard"
                                    value={maxMarks}
                                    onChange={(e) => setMaxMarks(e.target.value)}
                                />) : (<TextField
                                        fullWidth
                                        disabled
                                    margin="normal"
                                    name="maxMarks"
                                    label="Maximum Marks"
                                    type="number"
                                    variant="standard"
                                    value={maxMarks}
                                    onChange={(e) => setMaxMarks(e.target.value)}
                                />)}
                                
                            </div>

                        </div>
                        <div className='d-flex align-items-center justify-content-center py-3'  >
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Create Assessments
                            </Button>
                        </div>
                    </form>
                </div>
                <hr />
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Term</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Max Marks</TableCell>
                                    <TableCell>Subjects</TableCell>
                                    <TableCell>Rubrics</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assessments.map((assessment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{assessment.title}</TableCell>
                                        <TableCell>{assessment.term}</TableCell>
                                        <TableCell>{assessment.type}</TableCell>
                                        <TableCell>{assessment.type == "Rubrics" ? (
                                        <> - </>
                                        ) : (<>{ assessment.maxMarks}</>)}</TableCell>
                                        <TableCell>{Array.isArray(assessment.subjects) ? assessment.subjects.join(', ') : assessment.subjects}</TableCell>
                                        <TableCell>{assessment.type == "Rubrics" ? (
                                            <>
                                                <button onClick={() => handleRubrics(assessment._id)} className='btn btn-primary '>Add Rubrics</button>{<GradeSelect openRubrics={openRubrics} setOpenRubrics={setOpenRubrics} id={assessment._id} />}
                                            </>
                                        ) : (
                                            <button  className='btn btn-primary disabled'>Add Rubrics</button>
                                        )}</TableCell>
                                        <TableCell><button onClick={handleOpen} className='btn btn-warning'><EditBtn /></button><AssessmentDialog open={open} setOpen={setOpen} id={assessment._id} /></TableCell>
                                        <TableCell><button onClick={() => DeleteHandler(assessment._id)} className='btn btn-danger'><DeleteBtn /></button></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </div>
            </div>
        </>
    )
}

export default Assessment;


