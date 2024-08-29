import React, { useState } from "react";
import {Table, Pagination} from "react-bootstrap";

function CustomerTable(props) {
    const [currPage, setCurrPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(props.customers.length/itemsPerPage);

    const startIndex =  (currPage-1) * itemsPerPage;
    const endIndex = currPage * itemsPerPage;

    const currCustomers = props.customers.slice(
        startIndex,
        endIndex
    );

    const handlePageChange = (pageNum) => {
        setCurrPage(pageNum);
        props.setSelectedRow(null);
        props.setFormCustomer(props.blankCustomer);
    }

    const renderPaginationItems = () => {
        let items = [];
        for (let num = 1; num <= totalPages; num++) {
            items.push(
                <Pagination.Item
                    key={num}
                    active={num === currPage}
                    onClick={()=>handlePageChange(num)}
                
                >
                {num}
                </Pagination.Item>
            );
        }
        return items;

    }

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
                  {currCustomers.map((customer) => (
                      <tr key={customer.id} onClick={() => props.handleRowClick(customer.id)} 
                      style={{ fontWeight: props.selectedRow === customer.id ? 'bold' : 'normal'}}
                      >
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.password}</td>
                      </tr>
                  ))}
                  </tbody>
              </Table> 

              <div>
                Showing {currCustomers.length} of {props.customers.length}
              </div>

              <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currPage===1}/>
                <Pagination.Prev onClick={() => handlePageChange(currPage-1)} disabled={currPage===1}/>

                  {renderPaginationItems()}

                <Pagination.Next onClick={() => handlePageChange(currPage+1)} disabled={currPage===totalPages}/>
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currPage===totalPages}/>

              </Pagination>
        </div>
    );
}

export default CustomerTable;