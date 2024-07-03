import react, { useState } from 'react';
import '../../styles/Dialogbox.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { backend_URL } from '../../src/App';
import toast from 'react-hot-toast';

function Dialogbox({ title, open, setOpen, id }) {
    const [selectedSubjects, setSelectedSubjects] = useState([{ title: "Math" }]);

    const subjects = [
        { title: "Hindi" },
        { title: "Math" },
        { title: "Science" },
        { title: "English" }
    ];
    const handleClose = () => {
        setOpen(false);
    };

    const updateHandler = async (id) => {
        const response = await axios.post(`${backend_URL}/exam/${id}`,
            selectedSubjects,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true

            }
        )
        if (!response.data.success) {
            return toast.error("Something went wrong, try again!")
        }
        console.log(selectedSubjects)
        toast.success(response.data.message);
        setOpen(false);

    }
    const handleSubjectChange = (event, value) => {
        console.log('Selected Subjects:', value);
        setSelectedSubjects(value);
        // console.log("subs to pass: ",selectedSubjects);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ width: 300 }}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={subjects}
                            getOptionLabel={(option) => option.title}
                            value={selectedSubjects}
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            onChange={handleSubjectChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    // label="Enter the Subjects"
                                    placeholder="subjects"
                                />
                            )}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => updateHandler(id)}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Dialogbox