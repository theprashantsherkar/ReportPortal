import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backend_URL } from '../../src/App';
import toast from 'react-hot-toast';
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

const UpdateDialogs = ({ open, onClose, id }) => {
    const [formValues, setFormValues] = useState({
        Class: '',
        session: '',
        section: '',
        teacher: '',
    });
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');

   

    const handleAddSubject = () => {
        if (newSubject) {
            setSubjects([...subjects, newSubject]);
            setNewSubject('');
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSave = async (id) => {
        try {
            console.log(subjects);
            const response = await axios.put(`${backend_URL}/exam/${id}`, {
                formValues,
                subjects,
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (response.data.success) {
                toast.success('Exam updated successfully');

                onClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong!');
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Exam</DialogTitle>
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
                        <TextField
                            fullWidth
                            label="Teacher"
                            name="teacher"
                            value={formValues.teacher}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className='d-flex justify-content-center align-items-center'>
                            <TextField
                                fullWidth
                                label="Subjects"
                                name="Subjects"
                                value={newSubject}
                                onChange={(e) => setNewSubject(e.target.value)}
                            />
                            <div>
                                <Button variant='contained' onClick={handleAddSubject}>Add</Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>


                <ul>
                    {subjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                    ))}
                </ul>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={() => handleSave(id)}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateDialogs;
