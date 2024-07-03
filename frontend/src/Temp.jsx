import React from 'react'
// import SubjectCard from '../components/SubjectCard'
import Dialogbox from '../components/Dialogs/Dialogbox';
import { useState, useRef, useEffect } from 'react';



function Temp() {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const dialogRef = useRef(null);

    const handleButtonClick = () => {
        setIsDialogVisible(true);
    };

    const handleClickOutside = (event) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            setIsDialogVisible(false);
        }
    };

    useEffect(() => {
        if (isDialogVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDialogVisible]);

    return (
        <>
            <div className=" bg-slate-800 h-96 w-full d-flex align-items-center justify-content-center">
                {/* <button className='py-2 px-4 btn btn-primary rounded-md' onClick={handleButtonClick}>Show Dialog</button>
                {isDialogVisible && (
                    <div ref={dialogRef}>
                        <Dialogbox title={"Subjects"} children={<SubjectCard />} onClose={() => setIsDialogVisible(false)} />
                    </div>
                )} */}
                <div className='p-3 bg-white rounded-xl'>
                    {/* <SubjectCard /> */}
                    hello world
                </div>
            </div>
        </>
    )
}

export default Temp