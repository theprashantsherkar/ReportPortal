import React from 'react'
import { useState } from 'react';
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


function DialogList({ open, onClose, id }) {
    const subjectsList = ['Math', 'Science', 'History', 'English', 'Physical Education'];
    const [formValues, setFormValues] = useState({

        subjects: [],

    });

    const handleSubjectsChange = (event) => {
        const {
            target: { value },
        } = event;
        setFormValues({
            ...formValues,
            subjects: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleUpdate = () => {
        // Handle form submission to your backend
        console.log('Form values:', formValues);
        onClose();

    };
    return (
        <>
            <Dialog open={open} onClose={onClose} >
                <DialogTitle>Select Subjects</DialogTitle>
                <DialogContent >
                    <Grid container spacing={2} className='p-2'>

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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleUpdate(onClose)} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogList