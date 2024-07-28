import React from 'react'
import { Box, Container } from '@mui/system';
import logo from '../../src/logo.png'
import "../../styles/App.css";
import { Grid, Table, TableRow, TableContainer, TableHead, Typography } from '@mui/material';

function Report() {
    const studentData = {
        name: "ANUJ KUMAR CHAUDHARY",
        class: "Class 6 A",
        assessment: "1st Assessment",
        admissionNumber: "23-24/001",
        classTeacher: "ANKIT RATHI",
        subjects: [
            { subject: "English Language", grade: "16.5", remarks: "Aadhiriti is consistent in completing work. Effort to improve writing skills is necessary." },
            { subject: "Literature in English", grade: "12.0", remarks: "Aadhiriti possesses good communication skills. Must practice to write elaborate answers." },
            { subject: "III Language Kannada", grade: "06.5", remarks: "Regular reading and writing would help in understanding the language." },
            { subject: "III Language Sanskrit", grade: "15.0", remarks: "Must practice reading & writing." },
            { subject: "History and Civics", grade: "16.5", remarks: "Needs to listen more attentively during lessons." },
            { subject: "Geography", grade: "13.0", remarks: "Can do better." },
            { subject: "Physics", grade: "13.0", remarks: "Can aim higher." },
            { subject: "Chemistry", grade: "22.0", remarks: "Good effort, can still perform better." },
            { subject: "Biology", grade: "13.0", remarks: "Can be more attentive in the class to score higher marks." },
            { subject: "Mathematics", grade: "06.5", remarks: "More attentiveness in the class is required." },
            { subject: "Computer Studies", grade: "19.0", remarks: "Can aim higher." },
            { subject: "MUSIC", grade: "B", remarks: "" },
            { subject: "YOGA", grade: "A", remarks: "" },
            { subject: "Physical Education", grade: "B", remarks: "" },
            { subject: "Socially Useful Productive Work", grade: "", remarks: "" },
            { subject: "ATTENDANCE", grade: "48/48", remarks: "" },
            { subject: "Total", grade: "153", remarks: "" },
        ],
    };

    const styles = {
        header: {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '20px',
            padding: '16px',
            border: '1px solid black'
        },
        subHeader: {
            fontWeight: 'bold',
            border: '1px solid black',
            padding: '8px',
            backgroundColor: '#f2f2f2'
        },
        cell: {
            border: '1px solid black',
            padding: '8px',
            textAlign: 'left'
        },

    };
  return (
      <>
          <div className='d-flex justify-content-center align-items-center min-h-screen px-2 py-3 flex-column  w-full'>
              <div className='border border-black w-75 h-full py-4 px-2 d-flex my-3 flex-column align-items-center'>

                  <h1 className='fs-3 py-2 fw-semibold'>Acharya Vidya Kula</h1>
                  <div className=' fw-medium fs-6'>Affiliated to ICSE KA 063</div>
                  <div className=' fw-medium fs-6'>Aloka Road, Left Fork off</div>
                  <div className='fw-medium fs-6'>Mysore-Madikeri Highway at 12th KM Stone</div>
                  <div>
                      <img className='w-7 h-7 logo' src={logo} alt="logo" /></div>
                  <div className='fw-medium fs-4 fst-italic'>Report Card 2024-25</div>
                  <div className='py-5'>
                      <Container>
                          <Grid container spacing={2}>
                              <Grid item xs={6}>
                                  <Typography variant="body1"><strong>Student Name:</strong></Typography>
                              </Grid>
                              <Grid item xs={6}>
                                  <Typography variant="body1"><strong>{studentData?.name || "Prashant Sherkar"}</strong></Typography>
                                  <Box borderBottom={1} mt={1}></Box>
                              </Grid>

                              <Grid item xs={6}>
                                  <Typography variant="body1"><strong>Class :</strong></Typography>
                              </Grid>
                              <Grid item xs={6}>
                                  <Typography variant="body1"><strong>{studentData?.class || "Class X"}</strong></Typography>
                                  <Box borderBottom={1} mt={1}></Box>
                              </Grid>

                              <Grid item xs={6}>
                                  <Typography variant="body1"><strong>Roll Number:</strong></Typography>
                              </Grid>
                              <Grid item xs={6}>
                                  <Typography variant="body1"><strong>{studentData?.roll || 23} </strong></Typography>
                                  <Box borderBottom={1} mt={1}></Box>
                              </Grid>

                              <Grid item xs={6}>
                                  <Typography variant="body1"><strong>Class Teacher :</strong></Typography>
                              </Grid>
                              <Grid item xs={6}>
                                  <Typography variant="body1"><strong>{studentData?.classTeacher || "Vivek Sir"}</strong></Typography>
                                  <Box borderBottom={1} mt={1}></Box>
                              </Grid>
                          </Grid>
                      </Container>

                  </div>

              </div>


          </div>
          <hr />
          <div className='border border-black h-100 p-3 my-3 d-flex flex-column align-items-center  w-full'>
              <div style={{ width: '80%', margin: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                          <tr>
                              <th colSpan="3" style={styles.header}>Student Name: {studentData.name}</th>
                          </tr>
                          <tr>
                              <th colSpan="2" style={styles.subHeader}>{studentData.class}</th>
                              <th style={styles.subHeader}>{studentData.assessment}</th>
                          </tr>
                          <tr>
                              <th style={styles.subHeader}>Subjects and Skills</th>
                              <th style={styles.subHeader}>Grade</th>
                              <th style={styles.subHeader}>Remarks</th>
                          </tr>
                      </thead>
                      <tbody>
                          {studentData.subjects.map((subject, index) => (
                              <tr key={index}>
                                  <td style={styles.cell}>{subject.subject}</td>
                                  <td style={styles.cell}>{subject.grade}</td>
                                  <td style={styles.cell}>{subject.remarks}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  <div className='my-3' style={{ width: '80%', margin: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tr>
                              <td style={styles.cell}>Class Teacher's Signature</td>
                              <td style={styles.cell}></td>
                          </tr>
                          <tr>
                              <td style={styles.cell}>Principal's Signature</td>
                              <td style={styles.cell}></td>
                          </tr>
                          <tr>
                              <td style={styles.cell}>Parents Signature</td>
                              <td style={styles.cell}></td>
                          </tr>
                      </table>
                  </div>
                  <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                          <thead>
                              <tr>
                                  <th colSpan="2" style={{ border: '1px solid black', backgroundColor: '#f2f2f2', padding: '10px', fontWeight: 'bold' }}>GRADE INDICES</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Co-Scholastic</td>
                                  <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>Scholastic</td>
                              </tr>
                              <tr>
                                  <td style={{ border: '1px solid black', padding: '10px' }}>A – Excellent</td>
                                  <td style={{ border: '1px solid black', padding: '10px' }}>A – 80-100%</td>
                              </tr>
                              <tr>
                                  <td style={{ border: '1px solid black', padding: '10px' }}>B – Very Good</td>
                                  <td style={{ border: '1px solid black', padding: '10px' }}>B – 60-79%</td>
                              </tr>
                              <tr>
                                  <td style={{ border: '1px solid black', padding: '10px' }}>C – Good</td>
                                  <td style={{ border: '1px solid black', padding: '10px' }}>C – 35-59%</td>
                              </tr>
                              <tr>
                                  <td style={{ border: '1px solid black', padding: '10px' }}>D – Scope for Improvement</td>
                                  <td style={{ border: '1px solid black', padding: '10px' }}>D – 0-34%</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>

          </div>
      </>
  )
}

export default Report