import './App.css';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';
import {get, getAll, deleteById, post, put} from './memdb';
import { useState, useEffect } from 'react';

function App() {

  let blankCustomer = {"id": -1, "name":"", "email": "", "password": ""};
  const [selectedRow, setSelectedRow] = useState(null);
  const [formCustomer, setFormCustomer] = useState(blankCustomer);

  const [customers, setCustomers] = useState([]);

  const handleInputChange = function (event) {
    console.log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formCustomer}
    newFormObject[name] = value;
    setFormCustomer(newFormObject);
  }

  function handleRowClick(index) {
    setSelectedRow(selectedRow === index ? null : index);
    if(selectedRow === index) {

      setFormCustomer(blankCustomer);
    } else {
      const selectedCustomer = customers[index];

      setFormCustomer({ id: selectedCustomer.id, name: selectedCustomer.name, email: selectedCustomer.email, password: selectedCustomer.password })
    }
  }

  let handleAddClick = function() {
   
    console.log('Add btn clicked');
    if(selectedRow === null) {
      //call post

      console.log(formCustomer);
      post(formCustomer);
    } else {
      //call put
      console.log(formCustomer);
      const selectedCustomer = customers[selectedRow];
      put(selectedCustomer.id, formCustomer);
    }
   setFormCustomer(formCustomer);
  };
  
  
  let handleDeleteClick = function () {
    if(formCustomer.id >= 0){
      deleteById(formCustomer.id);
      setSelectedRow(null);

    } else {
      alert("Please Select a Customer to Delete");
    }
    setFormCustomer(blankCustomer);
    
  }

  const handleCancelClick = () => {
    setFormCustomer(blankCustomer);
  };

  useEffect(() => {
    getCustomers();
  })

  const getCustomers = function(){        
    //log("in getCustomers()");
    setCustomers(getAll());
  }

  const formLabel = selectedRow === null ? "Add New Customer" : "Update Customer";

  return (
    <div className="App">
      <div className='fullbox'>
      <div className='list-box'>
      <h1>Customer List</h1>
      <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)} 
                    style={{ fontWeight: selectedRow === index ? 'bold' : 'normal'}}
                    >
                    <td>{index+1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.password}</td>
                    </tr>
                ))}
                </tbody>
            </table> 
          </div>

          <CustomerAddUpdateForm formLabel={formLabel}
                                  formCustomer={formCustomer}
                                  handleInputChange={handleInputChange}
                                  handleDelete={handleDeleteClick}
                                  handleAddClick={handleAddClick}
                                  handleCancelClick={handleCancelClick}>

          </CustomerAddUpdateForm>
            
    </div>
    </div>
  );
}

export default App;
