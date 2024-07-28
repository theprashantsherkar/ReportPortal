import React, { useEffect, useState } from 'react'
import Reports from '../components/Report/Reports'
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function Dummy() {
    const [results, setResults] = useState([]);
    const location = useLocation();
    setResults(location.state?.results);
    const navigate = useNavigate();

    useEffect(() => {
        if (!results) {
            toast.error('Select Students first!')
            return navigate('/reports')
        }
    })
    return (
        <>
            {results.map((element) => (
                <>
                    <Reports result={element} />
            </>
            ))}

        </>
    )

}

export default Dummy