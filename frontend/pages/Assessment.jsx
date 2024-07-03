import React, { useState } from 'react'
import Header from '../components/Header'
import Dialogbox from '../components/Dialogs/Dialogbox'
import { Button } from '@mui/material'
import Table from '../components/Table'




function Assessment() {
    const [type, setType] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }

    //api call on form submit

    return (
        <>
            <Header />
            <div className='p-5'>
                <div className='font-extrabold'><h1>Assessment</h1></div>
                <hr />
                <div className='d-flex align-items-center justify-content-center'>
                    <form action="" className='p-3'>

                        <div className='d-flex align-item-center justify-content-center'>
                            <div>
                                <div className='p-2'>
                                    <label htmlFor="">Assessment Title: </label>
                                    <input type="text" className='border border-black rounded-lg px-1  mx-2' />
                                </div>


                                <div className='p-2'>
                                    <label htmlFor="term">Select Term: </label>
                                    <select name="term" id="term" className='border border-black mx-2'>
                                        <option value="Term 1">Term 1</option>
                                        <option value="Mid Term">Mid Term</option>
                                        <option value="End Term">End Term</option>
                                    </select>
                                </div>

                            </div>
                            <div>
                                <div>

                                    <div className='p-2'>
                                        <label htmlFor="assessment-type">Select Assessment Type: </label>
                                        <select className='border border-black mx-2' name="" id="assessment-type" value={type}>
                                            <option value="rubrics">rubrics</option>
                                            <option value="marks">marks</option>

                                        </select>
                                    </div>
                                    < div className='p-2' >
                                        <label htmlFor="max">Maximum Marks:</label>
                                        <input type="text" name="" id="max" className='border border-black mx-2 px-1' />



                                        <label className='mx-2' htmlFor="rubrics">Select Rubrics: </label>
                                        <select name="" className='border border-black ' id="">
                                            <option value="English">English</option>
                                            <option value="Hindi">Hindi</option>
                                            <option value="Marathi">Marathi</option>
                                        </select>
                                    </div >
                                </div>
                            </div>


                        </div>
                        <div className='p-2'>
                            <Button variant="outlined" onClick={handleOpen}>
                                Add Subjects
                            </Button>{open && (<Dialogbox title={"Add Subjects"} open={open} setOpen={setOpen} />)}
                            <button type="submit" className='btn btn-primary px-3 mx-3'>Submit</button>
                        </div>


                    </form>
                </div>
                <hr />
                <div>
                    {/* add data table here */}

                </div>
            </div>
        </>
    )
}

export default Assessment;


