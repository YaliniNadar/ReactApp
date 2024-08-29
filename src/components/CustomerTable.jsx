import React, { useState } from "react";
import {Table} from "react-bootstrap";

function CustomerTable(props) {
    const [currPage, setCurrPage] = useState(1);
    const itemsPerPage = 10;

    // const 

    return(
        <div className='list-box'>
        <h1>Customer List</h1>
        <Table bordered hover>
                  <thead>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Password</th>
                  </tr>
                  </thead>
                  <tbody>
                  {props.customers.map((customer, index) => (
                      <tr key={index} onClick={() => props.handleRowClick(index)} 
                      style={{ fontWeight: props.selectedRow === index ? 'bold' : 'normal'}}
                      >
                      <td>{index+1}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.password}</td>
                      </tr>
                  ))}
                  </tbody>
              </Table> 
        </div>
    );
}

export default CustomerTable;