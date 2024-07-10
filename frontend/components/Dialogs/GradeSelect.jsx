import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Button
} from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { backend_URL } from '../../src/App';

const gradesList = ['O', 'A', 'B', 'C', 'D', 'E', 'F'];

const GradeSelect = ({ openRubrics, setOpenRubrics, id}) => {
    const [grade, setGrade] = useState('');

    const handleGradeChange = (event) => {
        setGrade(event.target.value);
    };

    const handleSubmit = async(id) => {
        console.log('Selected Grade:', grade);
        console.log(`updated rubrics of assessment: ${id}`)
        // try {
        //     if (!grade) {
        //         setOpenRubrics(false);
        //         return toast.success('No Grade selected')
        //     }
        //     const response = await axios.put(`${backend_URL}/assessments/rubrics/${id}`,
        //         {grade},
        //         {
        //             headers: {
        //                 "Content-Type":"application/json"
        //             },
        //             withCredentials: true,
        //         }
        //     )
        //     if (!response.data.success) {
        //         toast.error('something went wrong')
        //         return setOpenRubrics(false);
        //     }
        //     toast.success(response.data.message);
        // } catch (error) {
        //     console.log(error)
        //     toast.error('Something went Wrong!')
        // }
        setOpenRubrics(false);

    };

    return (
        <Dialog open={openRubrics} onClose={()=>setOpenRubrics(false)}>
            <DialogTitle>
                Add Rubrics/Grade
            </DialogTitle>
            <DialogContent>

                <Box sx={{ minWidth: 30 }}>
                    <FormControl fullWidth margin="normal" variant="standard">
                        <InputLabel>Select Grade</InputLabel>
                        <Select
                            label="Grade"
                            value={grade}
                            onChange={handleGradeChange}
                        >
                            {gradesList.map((grade) => (
                                <MenuItem key={grade} value={grade}>
                                    {grade}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={() => handleSubmit(id)}>
                            Submit
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default GradeSelect;