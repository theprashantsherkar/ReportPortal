import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Checkbox,
    ListItemText,
} from '@mui/material';
import axios from 'axios';
import { backend_URL } from '../../src/App';
import toast from 'react-hot-toast';

function UpdateDialogs({ open, onClose, id }) {
    const [formValues, setFormValues] = useState({
        Class: '',
        session: '',
        section: '',
        subjects: [],
        teacher: '',
    });
    const subjectsList = ['Math', 'Science', 'History', 'English', 'Physical Education'];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubjectsChange = (event) => {
        const {
            target: { value },
        } = event;
        setFormValues({
            ...formValues,
            subjects: typeof value === 'string' ? value.split(',') : value,
        });

    }
    const handleUpdate = async(id) => {
        console.log('Form values:', formValues);
        if (!formValues) {
            onClose();
            return toast.success("nothing to Update")
        }
        try {
            const { data } = await axios.put(`${backend_URL}/exam/${id}`,
                formValues,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            if (!data.success) {
                return toast.error(data.message)
            }
            toast.success(data.message);
            onClose();
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
            onClose();
        }
    };

    return (
        <>
            <div className=''>
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>Update Exam Details</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Class"
                                    name="Class"
                                    value={formValues.Class}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Session"
                                    name="session"
                                    value={formValues.session}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Section"
                                    name="section"
                                    value={formValues.section}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Subjects</InputLabel>
                                    <Select
                                        label="Subjects"
                                        name="subjects"
                                        multiple
                                        value={formValues.subjects}
                                        onChange={handleSubjectsChange}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        {subjectsList.map((subject) => (
                                            <MenuItem key={subject} value={subject}>
                                                <Checkbox checked={formValues.subjects.indexOf(subject) > -1} />
                                                <ListItemText primary={subject} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Teacher"
                                    name="teacher"
                                    value={formValues.teacher}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={()=>handleUpdate(id, onClose)} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
        </>
    );
}

export default UpdateDialogs;
