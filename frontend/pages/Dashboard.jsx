import React from 'react'
import '../styles/dashboard.css'

function Dashboard() {
    //dashboard api goes here
  return (
      <>

              <div className="Dashboard">
                  <div className="dashContent">
                      <h3>Students</h3>
                  </div>
                  <div className="inputs dashContent">
                      <div class="mb-3">
                          <input class="form-control" type="file" id="formFile" />
                      </div>
                      <button type="button" class="btn btn-primary">Upload</button>
                  </div>
                  <hr />
                  <div className="dashHeader">
                      <p>show <select className='box' name="strength" id="">
                          <option value="">1</option>
                          <option value="">2</option>
                          <option value="">3</option>
                      </select> entries</p>
                      <p>Search: <input className='box' type="search" name="" id="" /> </p>
                  </div>
                  <div className="tableContent">
                      <table className='table table-bordered'>
                          <tr>
                              <th>Student name</th>
                              <th>Email</th>
                              <th>Action</th>
                          </tr>
                          <tr>
                              <td>avid</td>
                              <td>avid@gmail.com</td>
                              <td><button type='button' className='view btn btn-primary'>view</button></td>
                          </tr>

                      </table>
                  </div>
          </div>
      </>
  )
}

export default Dashboard