import React, { useEffect, useState } from 'react'
import Reports from '../components/Report/Reports'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function Dummy() {
    const location = useLocation();
    const results = location.state?.results;
    console.log(results);
    const navigate = useNavigate();

    useEffect(() => {
        if (!results) {
            toast.error('Select Students first!')
            return navigate('/reports')
        }
    })
    return (
        <>
            {results.map((result) => (
                <>
                    <Reports result={result} />
                </>
            ))}

        </>
    )

}

export default Dummy