import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { backend_URL } from '../../src/App';
import toast from 'react-hot-toast';


function AssessmentDialog({open, id, setOpen}) {
    const [formData, setFormData] = useState({
        title: '',
        term: '',
        type: '',
        maxMarks: '',
        rubrics: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(id) => {
        console.log('Form Data:', formData);
        try {
            if (!formData.title && !formData.maxMarks && !formData.rubrics && !formData.term && !formData.type) {
                setOpen(false);
                return toast.success("nothing to update!")
            }
            const response = await axios.put(`${backend_URL}/assessments/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            )
            if (!response.data.success) {
                return toast.error("Something Went Wrong!")
            }
            toast.success(response.data.message)

            setOpen(false);
        } catch (error) {
            console.log(error)
            toast.error("Internal Server Error!")
            setOpen(false);
        }
    };


  return (
      <>
          <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Update Assessment.</DialogTitle>
              <DialogContent>
                  <TextField
                      autoFocus
                      margin="dense"
                      name="title"
                      label="Title"
                      type="text"
                      fullWidth
                      variant="standard"
                      value={formData.title}
                      onChange={handleChange}
                  />
                  <FormControl fullWidth margin="dense" variant="standard">
                      <InputLabel>Select Term</InputLabel>
                      <Select
                          name="term"
                          value={formData.term}
                          onChange={handleChange}
                      >
                          <MenuItem value="Term 1">Term 1</MenuItem>
                          <MenuItem value="Term 2">Term 2</MenuItem>
                      </Select>
                  </FormControl>
                  <FormControl fullWidth margin="dense" variant="standard">
                      <InputLabel>Select Evaluation Type</InputLabel>
                      <Select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                      >
                          <MenuItem value="Type 1">Marks</MenuItem>
                          <MenuItem value="Type 2">Rubrics</MenuItem>
                      </Select>
                  </FormControl>
                  <TextField
                      margin="dense"
                      name="maxMarks"
                      label="Maximum Marks"
                      type="number"
                      fullWidth
                      variant="standard"
                      value={formData.maxMarks}
                      onChange={handleChange}
                  />
                  <FormControl fullWidth margin="dense" variant="standard">
                      <InputLabel>Select Rubrics</InputLabel>
                      <Select
                          name="rubrics"
                          value={formData.rubrics}
                          onChange={handleChange}
                      >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                          
                      </Select>
                  </FormControl>
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={() => handleSubmit(id)} color="primary">
                      Submit
                  </Button>
              </DialogActions>
          </Dialog>
      </>
  )
}

export default AssessmentDialog