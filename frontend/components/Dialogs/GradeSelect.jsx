import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Box,
    Button
} from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { backend_URL } from '../../src/App';



const GradeSelect = ({ openRubrics, setOpenRubrics, id }) => {
    const [input, setInput] = useState("");
    const [rubrics, setRubrics] = useState([]);

 

    const handleSubmit = async (id) => {
        const newRubrics = (input.split(", "));
        setRubrics(newRubrics);
        console.log(rubrics);
        console.log(newRubrics);
        try {
            if (!rubrics) {
                setOpenRubrics(false);
                return toast.success('No rubrics entered')
            }
            const response = await axios.put(`${backend_URL}/assessments/rubrics/${id}`,
                {rubrics:newRubrics},
                {
                    headers: {
                        "Content-Type":"application/json"
                    },
                    withCredentials: true,
                }
            )
            if (!response.data.success) {
                toast.error('something went wrong')
                return setOpenRubrics(false);
            }
            toast.success(response.data.message);
           console.log(response.data)
        } catch (error) {
            console.log(error)
            toast.error('Something went Wrong!')
        }
        setOpenRubrics(false);

    };

    return (
        <Dialog open={openRubrics} onClose={() => setOpenRubrics(false)}>
            <DialogTitle>
                Add Rubrics:
            </DialogTitle>
            <DialogContent>

                <Box sx={{ minWidth: 100}}>
                    <FormControl fullWidth margin="normal" variant="standard">
                        <TextField
                            autoFocus
                            margin="dense"
                            name="rubrics"
                            label="Rubrics"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                        />
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