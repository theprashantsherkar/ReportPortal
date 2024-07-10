import React, { useEffect, useState } from 'react'
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



function Assessment() {
    const exam  = useParams();
    const [title, setTitle] = useState('');
    const [term, setTerm] = useState('');
    const [type, setType] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const [rubrics, setRubrics] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [open, setOpen] = useState(false);
    const [openRubrics, setOpenRubrics] = useState(false);
    const subjectsList = ['Math', 'Science', 'History', 'English', 'Physical Education'];

    const handleRubrics = (id) => {
        console.log(`button id:${id} clicked`);
        setOpenRubrics(!openRubrics);
        if (openRubrics) {
            
        }
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            },
        },
    };

    const renderValue = (selected) => {
        if (selected.length === 0) {
            return <em>Select Subjects</em>;
        }

        const displayed = selected.slice(0, 2);
        const rest = selected.length - displayed.length;

        return (
            <Box>
                {displayed.map((value) => (
                    <Chip key={value} label={value} style={{ margin: 2 }} />
                ))}
                {rest > 0 && <Chip label={`+${rest} more`} style={{ margin: 2 }} />}
            </Box>
        );
    };

    const handleSubjectsChange = (event) => {
        const {
            target: { value },
        } = event;
        setSubjects(typeof value === 'string' ? value.split(',') : value)

    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleSubjectChange = (e) => {
        setSubjects(e.target.value.split(','));
    };


    const DeleteHandler = async(id) => {
        try {
            const response = await axios.delete(`${backend_URL}/assessments/${id}`, {
                headers: {
                    "Content-Type":"application/json"
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

    const handleSubmit = async() => {
        try {
            if (!title || !term || !type || !maxMarks || !rubrics || !subjects) {
                console.log("Every field is mandatory!")
                return toast.error("Every field is mandatory!")
            }

           const response = await axios.post(`${backend_URL}/assessments/${exam.id}`, {
               title,
               term,
               type,
               maxMarks,
               rubrics,
               subs: subjects
           },
               {
                   headers: {
                   "Content-Type":"application/json"
                   },
                   withCredentials:true,
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
    }, [handleSubmit, DeleteHandler, openRubrics])

    return (
        <>
            <Header />
            <div className='p-5'>
                <div className='Ass-Title font-extrabold'><h1>Assessment</h1></div>
                <hr />
                <div className=''>
                    <form action="" className='p-3'>
                        <div className='d-flex align-items-center justify-content-center flex-wrap '>
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
                                <FormControl  margin="normal" fullWidth variant="standard">
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
                                <FormControl  margin="normal" fullWidth variant="standard">
                                    <InputLabel>Select Evaluation Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={type}
                                        onChange={(e)=>setType(e.target.value)}
                                    >
                                        <MenuItem value="Type 1">Marks</MenuItem>
                                        <MenuItem value="Type 2">Rubrics</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='px-3 '>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="maxMarks"
                                    label="Maximum Marks"
                                    type="number"
                                    variant="standard"
                                    value={maxMarks}
                                    onChange={(e) => setMaxMarks(e.target.value)}
                                />
                                <FormControl fullWidth margin="normal" variant="standard">
                                    <InputLabel>Select Rubrics</InputLabel>
                                    <Select
                                        name="rubrics"
                                        value={rubrics}
                                        onChange={(e)=> setRubrics(e.target.value)}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>

                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal" variant="standard">
                                    <InputLabel>Select Subjects</InputLabel>
                                    <Select
                                        label="Subjects"
                                        name="subjects"
                                        multiple
                                        value={subjects}
                                        onChange={handleSubjectsChange}
                                        renderValue={renderValue}
                                        MenuProps={MenuProps}
                                    >
                                        {subjectsList.map((subject) => (
                                            <MenuItem key={subject} value={subject}>
                                                <Checkbox checked={subjects.indexOf(subject) > -1} />
                                                <ListItemText primary={subject} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                        <TableCell>{assessment.maxMarks}</TableCell>
                                        <TableCell>{Array.isArray(assessment.subjects) ? assessment.subjects.join(', ') : assessment.subjects}</TableCell>
                                        <TableCell><button onClick={() => handleRubrics(assessment._id)} className='btn btn-primary '>Add Rubrics</button>{<GradeSelect openRubrics={openRubrics} setOpenRubrics={setOpenRubrics} id={assessment._id} />}</TableCell>
                                        <TableCell><button onClick={handleOpen} className='btn btn-warning'><EditBtn /></button><AssessmentDialog open={open} setOpen={setOpen} id={assessment._id}/></TableCell>
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


