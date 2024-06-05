import React from 'react'

function Dashboard() {
  return (
      <>
          <div className="container">
              <div className="content">
                  <div className="heading">
                      Stuents
                  </div>
                  <div className="inputs">
                      <input type="file" name="excelFile" id="excelFile" />
                      <button type="submit">Upload</button>
                  </div>
                  <hr />
                  <div className="header">
                      <p>show <select name="strength" id="">
                          <option value=""></option>
                          <option value=""></option>
                          <option value=""></option>
                      </select> entries</p>

                      <input type="search" name="" id="" />


                  </div>

                  <div className="content">
                      <table>
                          <tr>
                              <th>Student name</th>
                              <th>Email</th>
                              <th>Action</th>
                          </tr>
                          <tr>
                              <td>avid</td>
                              <td>avid@gmail.com</td>
                              <td><button>view</button></td>
                          </tr>

                      </table>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Dashboard