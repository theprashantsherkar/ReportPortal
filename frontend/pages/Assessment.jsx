import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import DialogList from '../components/Dialogs/DialogList'
import '../styles/assessments.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { backend_URL } from '../src/App'

import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import toast from 'react-hot-toast'
import EditBtn from '../components/Buttons/EditBtn'
import DeleteBtn from '../components/Buttons/DeleteBtn'



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
    const handleOpen = () => {
        setOpen(true);
    }
    const handleSubjectChange = (e) => {
        setSubjects(e.target.value.split(','));
    };

    useEffect(() => {
        
    }, [])
    const handleSubmit = async() => {
        //todo:api call on form submit
        try {

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
           setAssessments(response.data.assessments);
           toast.success(response.data.message)
       } catch (error) {
           console.log(error)
           toast.error("something went wrong")
       }
    }

    return (
        <>
            <Header />
            <div className='p-5'>
                <div className='Ass-Title font-extrabold'><h1>Assessment</h1></div>
                <hr />
                <div className=''>
                    <form action="" className='p-3'>

                        <div className='d-flex align-items-center justify-content-center flex-wrap '>
                            <div className=''>
                                <TextField className='px-2' label="Title" value={title} onChange={(e) => setTitle(e.target.value)}  margin="normal" />
                                <TextField className='px-2' label="Term" value={term} onChange={(e) => setTerm(e.target.value)}  margin="normal" />
                                <TextField className='px-2' label="Type" value={type} onChange={(e) => setType(e.target.value)}  margin="normal" />
                            </div>
                            <div className=''>
                                <TextField className='px-2' label="Max Marks" value={maxMarks} onChange={(e) => setMaxMarks(e.target.value)}  margin="normal" />
                                <TextField className='px-2' label="Rubrics" value={rubrics} onChange={(e) => setRubrics(e.target.value)}  margin="normal" />
                                <TextField className='px-2' label="Subjects (comma-separated)" value={subjects.join(',')} onChange={handleSubjectChange}  margin="normal" />

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
                                    <TableCell>Add Rubrics</TableCell>
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
                                        <TableCell><Button>Add Rubrics</Button></TableCell>
                                        <TableCell><button className='btn btn-warning'><EditBtn /></button></TableCell>
                                        <TableCell><button className='btn btn-danger'><DeleteBtn /></button></TableCell>

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



// <div className='d-flex align-item-center justify-content-center'>
//                             <div>
//                                 <div className='p-2'>
//                                     <label htmlFor="">Assessment Title: </label>
//                                     <input type="text" className='border border-black rounded-lg px-1  mx-2' />
//                                 </div>


//                                 <div className='p-2'>
//                                     <label htmlFor="term">Select Term: </label>
//                                     <select name="term" id="term" className='border border-black mx-2'>
//                                         <option value="Term 1">Term 1</option>
//                                         <option value="Mid Term">Mid Term</option>
//                                         <option value="End Term">End Term</option>
//                                     </select>
//                                 </div>

//                             </div>
//                             <div>
//                                 <div>

//                                     <div className='p-2'>
//                                         <label htmlFor="assessment-type">Assessment Type: </label>
//                                         <select className='border border-black mx-2' name="" id="assessment-type">
//                                             <option value="rubrics">rubrics</option>
//                                             <option value="marks">marks</option>

//                                         </select>
//                                     </div>
//                                     < div className='p-2' >
//                                         <label htmlFor="max">Maximum Marks:</label>
//                                         <input type="text" name="" id="max" className='border border-black mx-2 px-1' />



//                                         <label className='mx-2' htmlFor="rubrics">Select Rubrics: </label>
//                                         <select name="" className='border border-black ' id="">
//                                             <option value="English">English</option>
//                                             <option value="Hindi">Hindi</option>
//                                             <option value="Marathi">Marathi</option>
//                                         </select>
//                                     </div >
//                                 </div>
//                             </div>


//                         </div>
//                         <div className='p-2'>
//                             <Button variant="outlined" onClick={handleOpen}>
//                                 Add Subjects
//                             </Button>{open && (<DialogList open={open} onClose={()=>setOpen(false)} />)}
//                             <button type="submit" onClick={() => submitHandler(id)} className='btn btn-primary px-3 mx-3'>Submit</button>
//                         </div>