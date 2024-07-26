import React, { useState } from 'react'
import logo from '../src/logo.png'
import "../styles/App.css";
import { Table, TableBody, TableCell,TableHead, TableRow } from '@mui/material';


function Dummy() {
    const [student, setStudent] = useState({})
  
  return (
      <div className='d-flex justify-content-center align-items-center min-h-screen px-2 py-5  w-full'>
          <div className='border border-black w-75 h-full py-4 px-2 d-flex flex-column align-items-center'>
              
              <h1 className='fs-3 py-2 fw-semibold'>Acharya Vidya Kula</h1>
              <div className=' fw-medium fs-6'>Affiliated to ICSE KA 063</div>    
              <div className=' fw-medium fs-6'>Aloka Road, Left Fork off</div>
              <div className='fw-medium fs-6'>Mysore-Madikeri Highway at 12th KM Stone</div>
              <div>
                  <img className='w-7 h-7 logo' src={logo} alt="logo" /></div> 
              <div className='fw-medium fs-4 fst-italic'>Report Card 2024-25</div>
              <div>
                  <Table>
                      <TableBody>
                          <TableRow>
                              <TableCell className='fw-semibold'>
                                  Student Name:
                              </TableCell>
                              <TableCell>{student?.name || "Student name"}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell className='fw-semibold'>
                                  Class:
                              </TableCell>
                              <TableCell>{student?.Class || "Class X"}</TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
              </div>

          </div>
    </div>
  )
}

export default Dummy