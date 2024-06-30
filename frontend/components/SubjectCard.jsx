import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import "../styles/popup.css";

function SubjectCard() {
    const subjects = [
        { title: "hindi" },
        { title: "Math" },
        { title: "science" },
        { title: "english" }
    ];

    // Debugging output
    console.log('Subjects:', subjects);

    return (
        <div className='p-2 popup bg-slate-400'>
            <Stack spacing={3} sx={{ width: 300 }}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    options={subjects}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[subjects[1]]}  // Default to "Math"
                    isOptionEqualToValue={(option, value)=> {option.title == value.title}}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Enter the Subjects"
                            placeholder="subjects"
                        />
                    )}
                />
                <button className="p-2 btn btn-primary" type="submit">Update</button>
            </Stack>
        </div>
    );
}

export default SubjectCard;
